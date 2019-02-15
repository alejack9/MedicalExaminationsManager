import { Notifica } from './notifica';
import { Visita } from './visita';

export class NotificaAnticipo extends Notifica {
  constructor(private visita: Visita, private dataAnticipo: Date) {
    super();
  }

  public crea(visita: Visita, nuovaData: Date): Notifica {
    const notifica: Notifica = new NotificaAnticipo(visita, nuovaData);
    return notifica;
  }
}
