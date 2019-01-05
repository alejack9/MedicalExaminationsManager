import { Assenza } from "./Assenza";
import { Notifica } from "./Notifica";
import { Visita } from "./Visita";

export class NotificaAssenza extends Notifica {
  constructor(
    protected _testo: string,
    protected _visita: Visita,
    protected _tipo: string,
    protected _data: Date,
    private _assenza: Assenza
  ) {
    super(_testo, _visita, _tipo, _data);
  }

  public get assenza() {
    return this._assenza;
  }
}
