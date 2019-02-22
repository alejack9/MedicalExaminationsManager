import { Document } from 'mongoose';

export interface IStruttura extends Document {
  nome: string;
  indirizzo: string;
  tipologia: string;
  orari: [Date];
}
