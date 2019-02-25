import { Document } from 'mongoose';
import { Allegato } from './allegato.interface';

export interface Referto extends Document {
  nome: string;
  path: string;
  allegato: [Allegato];
}
