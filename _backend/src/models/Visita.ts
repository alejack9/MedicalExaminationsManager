import { Patient } from "./Patient";
import { Referto } from "./Referto";

export class Visita {
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

  public get tipoVisita() {
    return this._tipoVisita;
  }
  public get effettuata() {
    return this._effettuata;
  }
  public get priorita() {
    return this._priorita;
  }
  public get pagata() {
    return this._pagata;
  }
  public get data() {
    return this._data;
  }
  public get paziente() {
    return this._paziente;
  }
  public get referto() {
    return this._referto;
  }

  public equals(obj: object): boolean {
    if (obj === null) {
      return false;
    }
    if (obj instanceof Visita) {
      return false;
    }
    if (obj === this) {
      return true;
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