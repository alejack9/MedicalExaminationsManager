import { Document, Types } from 'mongoose';
import { TipoVisita } from './tipo-visita.interface';

export interface Orario extends Document {
  inizio: Date;
  fine: Date;
  indiceGiornoSettimana: number;
  struttura: Types.ObjectId;
  tipoVisita: TipoVisita;
}
