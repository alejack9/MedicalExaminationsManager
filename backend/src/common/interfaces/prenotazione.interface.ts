import { Document } from 'mongoose';
import { Struttura } from './struttura.interface';
import { Visita } from './visita.interface';

export interface Prenotazione extends Document {
  visita: Visita;
  data: Date;
  annullata: boolean;
  struttura: Struttura;
}
