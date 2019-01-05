import { Visita } from "./Visita";

export class Notifica {
  constructor(
    protected _testo: string,
    protected _visita: Visita,
    protected _tipo: string,
    protected _data: Date
  ) {}

  public get testo() {
    return this._testo;
  }

  public set testo(t: string) {
    this._testo = t;
  }

  public get visita() {
    return this._visita;
  }

  public set visita(v: Visita) {
    this._visita = v;
  }

  public get tipo() {
    return this._tipo;
  }

  public set tipo(type: string) {
    this._tipo = type;
  }

  public get data() {
    return this._data;
  }

  public set data(dt: Date) {
    this._data = dt;
  }
}
