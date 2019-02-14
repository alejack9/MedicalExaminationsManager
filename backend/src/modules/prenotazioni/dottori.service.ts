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
    tipoVisita: TipoVisita,
    data: Moment,
  ): Promise<[OfficeDoctor]> {
    /**
     * In DB indiceGiornoSettimana parte da 0
     */
    const giornoSettimana = data.weekday();
    const toReturn: [OfficeDoctor] = await this.officeDoctorModel
      .aggregate([
        {
          $match: {
            'orari.struttura': Types.ObjectId(idStruttura),
            'orari.tipo.nome': tipoVisita.nome,
            'orari.indiceGiornoSettimana': giornoSettimana,
          },
        },
        {
          $unwind: {
            path: '$assenze',
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
            assenze: {
              $push: '$assenze.intervallo',
            },
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
      ])
      .exec();
    const newOrari: Orario[] = new Array();
    for (const od of toReturn) {
      for (const orario of od.orari) {
        console.log(od.assenze);
        if (od.assenze !== undefined) {
          for (const assenza of od.assenze) {
            if (assenza.intervallo.indexOf(orario.inizio) !== -1) {
              newOrari.push(orario);
            }
          }
        }
      }
      od.orari = newOrari;
      newOrari.splice(0, newOrari.length);
    }
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
