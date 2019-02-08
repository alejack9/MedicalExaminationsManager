import INotifica from "../models/Notifica";
import NotificaAnticipo from "../models/NotificaAnticipo";
import Prenotazione from "../models/Prenotazione";
import { TipoNotifica } from "../models/TipoNotifica";

export default abstract class Notificator {
  public static creaNotifica(
    prenotazione: Prenotazione,
    tipoNotifica: TipoNotifica,
    nuovaData?: Date
  ): INotifica {
    let notifica: INotifica;
    switch (tipoNotifica) {
      case TipoNotifica.anticipo:
        notifica = new NotificaAnticipo(prenotazione, nuovaData as Date);
        break;
      case TipoNotifica.assenza:
        throw new Error("Method not implemented.");
        break;
      case TipoNotifica.referto:
        throw new Error("Method not implemented.");
        break;
      default:
        throw new Error("Unkown Notification Type");
    }
    return notifica;
  }
}
