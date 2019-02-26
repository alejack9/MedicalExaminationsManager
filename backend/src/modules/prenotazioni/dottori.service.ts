import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OfficeDoctor } from 'src/common/interfaces/office-doctor.interface';
import { Prenotazione } from 'src/common/interfaces/prenotazione.interface';
import { Moment } from 'moment';
import { ObjectID } from 'bson';

@Injectable()
export class DottoriService {
  constructor(
    @InjectModel('Office-Doctor')
    private readonly officeDoctorModel: Model<OfficeDoctor>,
    @InjectModel('Reservation')
    private readonly prenotazioneModel: Model<Prenotazione>,
  ) {}
  async getDottori(
    idStruttura: string,
    tipoVisita: ObjectID,
    data: Moment,
  ): Promise<[OfficeDoctor]> {
    const giornoSettimana = data.weekday();
    const query = [
      {
        $match: {
          'orari.struttura': Types.ObjectId(idStruttura),
          'orari.tipo': tipoVisita,
          'orari.indiceGiornoSettimana': giornoSettimana,
        },
      },
      {
        $unwind: {
          path: '$assenze',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$assenze.intervallo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          valido: {
            $cond: {
              if: {
                $or: [
                  {
                    $ne: ['$assenze.struttura', Types.ObjectId(idStruttura)],
                  },
                  {
                    $gt: ['$assenze.intervallo.inizio', data.toDate()],
                  },
                  {
                    $lt: ['$assenze.intervallo.fine', data.toDate()],
                  },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          nome: {
            $max: '$nome',
          },
          cognome: {
            $max: '$cognome',
          },
          orari: {
            $max: '$orari',
          },
          valido: {
            $push: '$valido',
          },
        },
      },
      {
        $project: {
          valido: {
            $allElementsTrue: ['$valido'],
          },
        },
      },
      {
        $match: {
          valido: true,
        },
      },
      {
        $project: {
          _id: 1,
          nome: 1,
          cognome: 1,
          orari: 1,
        },
      },
      {
        $unwind: {
          path: '$orari',
        },
      },
      {
        $match: {
          'orari.struttura': Types.ObjectId(idStruttura),
          'orari.tipo': tipoVisita,
          'orari.indiceGiornoSettimana': giornoSettimana,
        },
      },
      {
        $group: {
          _id: '$_id',
          nome: {
            $max: '$nome',
          },
          cognome: {
            $max: '$cognome',
          },
          orari: {
            $push: '$orari',
          },
        },
      },
    ];
    const toReturn = await this.officeDoctorModel.aggregate(query).exec();
    console.log(toReturn);
    return toReturn;
  }
  async getPrenotazioni(
    idDottore: Types.ObjectId,
    inizio: Date,
    fine: Date,
  ): Promise<[Prenotazione]> {
    const query = [
      {
        $match: {
          dataInizio: {
            $gte: inizio,
            $lt: fine,
          },
        },
      },
      {
        $match: {
          medico: idDottore,
        },
      },
    ];

    return await this.prenotazioneModel.aggregate(query).exec();
  }
}
