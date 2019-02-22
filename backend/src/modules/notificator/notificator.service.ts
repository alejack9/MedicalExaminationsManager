import { Injectable } from '@nestjs/common';
import { Prenotazione } from 'src/common/classes/prenotazione';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { NotificaAnticipo } from 'src/common/classes/notificaAnticipo';
import { Notifica } from 'src/common/classes/notifica';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotifica } from 'src/common/interfaces/notifica.interface';
import { IPrenotazione } from 'src/common/interfaces/prenotazione.interface';

@Injectable()
export class NotificatorService {
  constructor(
    @InjectModel('Notification')
    private readonly notificheModel: Model<INotifica>,
  ) {}

  async creaNotifica(prenotazione: IPrenotazione, tipo: TipoNotifica) {
    if (tipo === TipoNotifica.anticipo) {
      await this.notificheModel.create({
        prenotazione: prenotazione._id,
        date: prenotazione.visita.dataInizio,
      });
    }
  }
}
