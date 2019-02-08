import { Document } from 'mongoose';

export interface Struttura extends Document {
  nome: string;
  indirizzo: string;
  tipologia: string;
  orari: [Date];
}
