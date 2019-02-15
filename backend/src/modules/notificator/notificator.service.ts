import { Injectable } from '@nestjs/common';
import { Prenotazione } from 'src/common/classes/prenotazione';
import { TipoNotifica } from 'src/common/enumerations/tipoNotifica.enumeration';
import { NotificaAnticipo } from 'src/common/classes/notificaAnticipo';
import { Notifica } from 'src/common/classes/notifica';

@Injectable()
export class NotificatorService {
  creaNotifica(prenotazione: Prenotazione, tipo: TipoNotifica): Notifica {
    if (tipo === TipoNotifica.anticipo) {
      const notificaAnticipo: NotificaAnticipo = null;
      const notifica = notificaAnticipo.crea(
        prenotazione.getVisita(),
        prenotazione.getData(),
      );

      return notifica;
    }
  }
}
