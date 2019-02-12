import { Document } from 'mongoose';
import { TipoVisita } from './tipoVisita.interface';

export interface Orario extends Document {
  inizio: Date;
  fine: Date;
  struttura: string;
  tipoVisita: TipoVisita;
}
