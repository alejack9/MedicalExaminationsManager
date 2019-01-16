import INotifica from "../models/INotifica";
import NotificaAnticipo from "../models/NotificaAnticipo";
import { NotificaAssenza } from "../models/NotificaAssenza";
import NotificaReferto from "../models/NotificaReferto";
import Prenotazione from "../models/Prenotazione";
import { TipoNotifica } from "../models/TipoNotifica";

export default abstract class Notificator {
  public static creaNotifica(
    prenotazione: Prenotazione,
    tipoNotifica: TipoNotifica,
    nuovaData?: Date
  ): INotifica {
    switch (tipoNotifica) {
      case TipoNotifica.anticipo:
        return new NotificaAnticipo(prenotazione, nuovaData as Date);
      case TipoNotifica.assenza:
        return new NotificaAssenza(prenotazione);
      case TipoNotifica.referto:
        return new NotificaReferto(prenotazione);
      default:
        throw new Error("Unkown Notification Type");
    }
  }
}
