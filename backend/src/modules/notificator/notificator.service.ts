import { Injectable } from '@nestjs/common';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifica } from 'src/common/interfaces/notifica.interface';
import { ObjectId } from 'bson';

@Injectable()
export class NotificatorService {
  constructor(
    @InjectModel('Notification')
    private readonly notificheModel: Model<Notifica>,
  ) {}

  async creaNotifica(prenotazione: any, data: Date, tipo: TipoNotifica) {
    if (tipo === TipoNotifica.anticipo) {
      // await this.notificheModel.create({
      //   prenotazione: prenotazione._id,
      //   date: prenotazione.visita.dataInizio,
      // });
      const notifica = await new this.notificheModel({
        prenotazione,
        data,
      });
      notifica.save();
    }
  }
}
