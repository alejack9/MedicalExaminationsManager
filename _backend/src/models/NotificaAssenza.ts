import INotifica from "./INotifica";
import Prenotazione from "./Prenotazione";
import { TipoNotifica } from "./TipoNotifica";

export class NotificaAssenza implements INotifica {
  public constructor(private _prenotaizone: Prenotazione) {}
  public getTipo(): TipoNotifica {
    return TipoNotifica.assenza;
  }
}
