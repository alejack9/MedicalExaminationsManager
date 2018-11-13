import { Patient } from './patient';

export class Visit {

  constructor(private _patient: Patient, private _tipo: string, private _luogo: string, private _data: Date, private _id: number) {
    this._patient = _patient;
    this._tipo = _tipo;
    this._luogo = _luogo;
    this._data = new Date(_data);
    this._id =  _id;
  }

  get tipo(): string {
    return this._tipo;
  }
  get luogo(): string {
    return this._luogo;
  }
  get Data(): Date {
    return this._data;
  }

  // public toString() {
  //   return this._luogo + ' ' + this._tipo + ' ' + this._data;
  // }
}


