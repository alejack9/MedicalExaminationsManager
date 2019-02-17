import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { OfficeDoctor } from 'src/common/interfaces/office-doctor.interface';
import { TipoVisita } from 'src/common/interfaces/tipoVisita.interface';
import { Struttura } from 'src/common/interfaces/struttura.interface';
import { Prenotazione } from 'src/common/interfaces/prenotazione.interface';
import { Moment } from 'moment';
import { Orario } from 'src/common/interfaces/orario.interface';

@Injectable()
export class DottoriService {
  constructor(
    @InjectModel('Structure') private readonly struttureModel: Model<Struttura>,
    @InjectModel('Office-Doctor')
    private readonly officeDoctorModel: Model<OfficeDoctor>,
    @InjectModel('Reservations')
    private readonly prenotazioneModel: Model<Prenotazione>,
  ) {}
  async getDottori(
    idStruttura: string,
    tipoVisita: string,
    data: Moment,
  ): Promise<[OfficeDoctor]> {
    const giornoSettimana = data.weekday();
    const query = [
      {
        $match: {
          'orari.struttura': new Types.ObjectId(idStruttura),
          'orari.tipo.nome': tipoVisita,
          'orari.indiceGiornoSettimana': giornoSettimana,
        },
      },
      {
        $unwind: {
          path: '$assenze',
        },
      },
      {
        $unwind: {
          path: '$assenze.intervallo',
        },
      },
      {
        $match: {
          $or: [
            {
              'assenze.struttura': {
                $ne: new Types.ObjectId(idStruttura),
              },
            },
            {
              'assenze.intervallo.inizio': {
                $gt: data.toDate(),
              },
            },
            {
              'assenze.intervallo.fine': {
                $lt: data.toDate(),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: '$_id',
          nome: {
            $push: '$nome',
          },
          cognome: {
            $push: '$cognome',
          },
          orari: {
            $push: '$orari',
          },
          ains: {
            $sum: 1,
          },
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
          path: '$nome',
        },
      },
      {
        $unwind: {
          path: '$cognome',
        },
      },
      {
        $unwind: {
          path: '$orari',
        },
      },
    ];
    return await this.officeDoctorModel.aggregate(query).exec();
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
