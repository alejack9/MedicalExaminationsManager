import { Visit } from './visit';

export class Patient {


  // field


  // constructor
  constructor(private _nome: string, private  _cognome: string, private  _id: number , private  _visit?: Visit) {
    this._nome = _nome;
    this._cognome = _cognome;
    this._id = _id;
    this._visit = _visit;
  }


  get nome(): string {
    return this._nome;
  }
  get cognome(): string {
    return this._cognome;
  }
  get id(): number {
    return this._id;
  }
  get visit(): Visit {
    return this._visit;
  }





  // function
  Print(): void {
    console.log(this._nome + ' ' + this._cognome + ' ' + this._id);
  }
}
