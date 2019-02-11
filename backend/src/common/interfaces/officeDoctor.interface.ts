import { Document } from 'mongoose';

export interface OfficeDoctor extends Document {
  nome: string;
  cognome: string;
  id: number;
  specializzazione: string;
}
