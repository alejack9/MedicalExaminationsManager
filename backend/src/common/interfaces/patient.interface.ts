import { Document } from 'mongoose';

export interface IPatient extends Document {
  id: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  reputazione: number;
}
