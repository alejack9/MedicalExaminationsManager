import { NotificaReferto } from "./NotificaReferto";
import { Visita } from "./Visita";

export class Notificator {
  public creaNotifica(testo: string, visita: Visita, tipo: string) {
    const date = new Date();
    const notifica = new NotificaReferto(testo, visita, tipo, date, visita);
    return notifica;
  }
}
