import { Injectable } from '@nestjs/common';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notifica } from 'src/common/interfaces/notifica.interface';
import { ObjectId } from 'bson';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificheModel: Model<Notifica>,
  ) {}

  async creaNotifica(
    prenotazioneTarget: any,
    tipo: TipoNotifica,
    prenotazioneOfferta?: Types.ObjectId,
  ) {
    switch (tipo) {
      case 'anticipo':
        return await new this.notificheModel({
          prenotazione: prenotazioneTarget,
          data: Date.now(),
          prenotazioneAnticipata: prenotazioneOfferta,
          tipo,
        }).save();
        break;
      case 'assenza':
        throw new Error('TODO');
        break;
      case 'refertoCaricato':
        throw new Error('TODO');
        break;
      default:
        throw new Error('Tipo notifica sconosciuto');
    }
  }

  async getNotifications(idPaziente: ObjectId) {
    return await this.notificheModel
      .aggregate([
        {
          $lookup: {
            from: 'reservations',
            localField: 'prenotazione',
            foreignField: '_id',
            as: 'prenotazione',
          },
        },
        {
          $unwind: {
            path: '$prenotazione',
          },
        },
        {
          $lookup: {
            from: 'examinations',
            localField: 'prenotazione.visita',
            foreignField: '_id',
            as: 'prenotazione.visita',
          },
        },
        {
          $unwind: {
            path: '$prenotazione.visita',
          },
        },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'prenotazione.visita.ricetta',
            foreignField: '_id',
            as: 'prenotazione.visita.ricetta',
          },
        },
        {
          $unwind: {
            path: '$prenotazione.visita.ricetta',
          },
        },
        {
          $match: {
            'prenotazione.visita.ricetta.paziente': idPaziente,
          },
        },
      ])
      .exec();
  }
}
