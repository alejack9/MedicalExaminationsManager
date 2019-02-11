import { Document } from 'mongoose';

export interface Patient extends Document {
  nome: string;
  cognome: string;
  id: number;
  reputazione: number;
}
