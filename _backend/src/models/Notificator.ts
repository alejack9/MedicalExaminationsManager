import { Assenza } from "./Assenza";
import { Notifica } from "./Notifica";
import { NotificaAssenza } from "./NotificaAssenza";
import { NotificaReferto } from "./NotificaReferto";
import { Visita } from "./Visita";

const d: Date[] = [];
const d1 = new Date();
d.push(d1);

export class Notificator {
  public creaNotifica(
    testo: string,
    visita: Visita,
    tipo: string,
    assenza: Assenza = new Assenza(d, " ", visita.officeDoctor)
  ) {
    const date = new Date();

    if (tipo === "Notifica Referto") {
      return new NotificaReferto(testo, visita, tipo, date, visita);
    } else {
      return new NotificaAssenza(testo, visita, tipo, date, assenza);
    }
  }
}
