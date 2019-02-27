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

  async creaNotifica(prenotazione: any, data: Date, tipo: TipoNotifica, prenotazioneAnticipata?: Types.ObjectId) {
    switch (tipo) {
      case TipoNotifica.anticipo:
        return await new this.notificheModel({
          prenotazione,
          data,
          prenotazioneAnticipata,
          tipo,
        }).save();
        break;
      case TipoNotifica.assenza:
        throw new Error('TODO');
        break;
      case TipoNotifica.refertoCaricato:
        throw new Error('TODO');
        break;
      default: throw new Error('Tipo notifica sconosciuto');
    }
  }

  // TODO
  async getNotifications(idPaziente: ObjectId) {
    this.notificheModel.aggregate([
      {
        $lookup: {
          from: 'examinations',
          localField: 'visita',
          foreignField: '_id',
          as: 'visita',
        },
      },
    ]);
  }
}
