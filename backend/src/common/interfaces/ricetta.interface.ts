import { Document, Types } from 'mongoose';

export interface Ricetta extends Document {
  codiceRicetta: string;
  tipoVisita: string;
  paziente: Types.ObjectId;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;
}
