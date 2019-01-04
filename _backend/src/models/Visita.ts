import { Patient } from "./Patient";
import { Referto } from "./Referto";

export class Visita {
  [key: string]: any;

  constructor(
    private _tipoVisita: string,
    private _effettuata: boolean,
    private _priorita: number,
    private _pagata: boolean,
    private _data: Date,
    private _paziente: Patient,
    private _referto?: Referto | undefined
  ) {
    if (_priorita < 0) {
      throw new Error("La priorita` deve essere maggiore o uguale a 0");
    }
  }

  get tipoVisita() {
    return this._tipoVisita;
  }
  get effettuata() {
    return this._effettuata;
  }
  get priorita() {
    return this._priorita;
  }
  get pagata() {
    return this._pagata;
  }
  get data() {
    return this._data;
  }
  get paziente() {
    return this._paziente;
  }
  get referto() {
    return this._referto;
  }

  public equals(obj: object): boolean {
    if (obj === null) {
      return false;
    }
    if (obj === this) {
      return true;
    }
    if (!(obj instanceof Visita)) {
      return false;
    }
    const visita = obj as Visita;
    if (
      this._tipoVisita === visita._tipoVisita &&
      this._effettuata === visita._effettuata &&
      this._pagata === visita._pagata &&
      this._data === visita._data &&
      this._paziente.equals(visita._paziente) &&
      ((this._referto === undefined && visita._referto === undefined) ||
        (this._referto as Referto).equals(visita._referto as Referto))
    ) {
      return true;
    }
    return false;
  }
}
