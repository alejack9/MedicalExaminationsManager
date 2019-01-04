import { Patient } from './patient';

export class Examination {

  constructor(
    private _tipo: string,
    private _luogo: string,
    private _data: Date,
    private _id: number,
    private _effettuata: boolean) { }

  get tipo(): string {
    return this._tipo;
  }
  get luogo(): string {
    return this._luogo;
  }
  get Data(): Date {
    return this._data;
  }

  get effettuata(): boolean {
    return this._effettuata;
  }

  // public toString() {
  //   return this._luogo + ' ' + this._tipo + ' ' + this._data;
  // }
}

