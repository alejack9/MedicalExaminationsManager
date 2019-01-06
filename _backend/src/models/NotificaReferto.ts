import { Notifica } from "./Notifica";
import { Visita } from "./Visita";

export class NotificaReferto extends Notifica {
  constructor(
    protected _testo: string,
    protected _visita: Visita,
    protected _tipo: string,
    protected _data: Date,
    private _visitaAnticipata: Visita
  ) {
    super(_testo, _visita, _tipo, _data);
  }
}
