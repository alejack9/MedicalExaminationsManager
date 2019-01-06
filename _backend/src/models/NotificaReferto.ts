import INotifica from "./INotifica";
import Prenotazione from "./Prenotazione";
import { TipoNotifica } from "./TipoNotifica";

export default class NotificaReferto implements INotifica {
  public constructor(private _prenotazione: Prenotazione) {}
  public getTipo(): TipoNotifica {
    return TipoNotifica.referto;
  }
}
