import { Document } from 'mongoose';
import { Struttura } from './struttura.interface';
import { Visita } from './visita.interface';

export interface IPrenotazione extends Document {
  visita: Visita;
  data: Date;
  annullata: boolean;
  struttura: Struttura;
}
