import OfficeDoctor from "./OfficeDoctor";

export default class Assenza {
  constructor(
    private _data: Date[],
    private _motivazione: string,
    private _officeDoctor: OfficeDoctor
  ) {}

  public get motivazione() {
    return this._motivazione;
  }
  public set motivazione(motivo: string) {
    this._motivazione = motivo;
  }

  public get data() {
    return this._data;
  }

  public set data(d: Date[]) {
    this._data = d;
  }
}
