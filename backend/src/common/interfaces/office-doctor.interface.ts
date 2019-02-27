import { Document } from 'mongoose';
import { Orario } from './orario.interface';
import { Assenza } from './assenza.interface';

export interface OfficeDoctor extends Document {
  nome: string;
  indirizzo: string;
  tipologia: string;
  assenze: Assenza[];
  orari: Orario[];
}
