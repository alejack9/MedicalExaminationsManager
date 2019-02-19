import { Document } from 'mongoose';
import { Struttura } from './struttura.interface';
import { Visita } from './visita.interface';

export interface IPrenotazione extends Document {
  readonly visita: Visita;
  readonly data: Date;
  readonly annullata: boolean;
  readonly struttura: Struttura;
}

// this.annullata = true;
//     this .visita.cancellaRicetta(salvaRicetta);
//     return this .annullata;
