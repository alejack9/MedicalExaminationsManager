import INotifica from "./Notifica";
import Prenotazione from "./Prenotazione";
import { TipoNotifica } from "./TipoNotifica";

export default class NotificaAnticipo implements INotifica {
  public constructor(
    private _prenotazione: Prenotazione,
    private _nuovaData: Date
  ) {}
  public getTipo(): TipoNotifica {
    return TipoNotifica.anticipo;
  }
}
