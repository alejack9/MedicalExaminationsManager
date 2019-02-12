import { Document } from 'mongoose';
import { Orario } from './orario.interface';

export interface Dottore extends Document {
  nome: string;
  indirizzo: string;
  tipologia: string;
  orari: [Orario];
}
