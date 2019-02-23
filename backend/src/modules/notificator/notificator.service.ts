import { Injectable } from '@nestjs/common';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotifica } from 'src/common/interfaces/notifica.interface';
import { ObjectId } from 'bson';

@Injectable()
export class NotificatorService {
  constructor(
    @InjectModel('Notification')
    private readonly notificheModel: Model<INotifica>,
  ) {}

  async creaNotifica(prenotazione: any, dataInizio: Date, tipo: TipoNotifica) {
    if (tipo === TipoNotifica.anticipo) {
      // await this.notificheModel.create({
      //   prenotazione: prenotazione._id,
      //   date: prenotazione.visita.dataInizio,
      // });
      const notifica = new this.notificheModel({
        _id: new ObjectId(),
        prenotazione,
        data: dataInizio,
      });
      notifica.save();
    }
  }
}
