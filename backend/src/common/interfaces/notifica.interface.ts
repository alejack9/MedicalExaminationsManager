import { Document } from 'mongoose';
import { Prenotazione } from './prenotazione.interface';

export interface Notifica extends Document {
  prenotazione: Prenotazione;
  data: Date;
  letta: boolean;
}
