import { Document } from 'mongoose';
import { Prenotazione } from '../classes/prenotazione';

export interface Notifica extends Document {
  prenotazione: Prenotazione;
  data: Date;
}
