import { Document } from 'mongoose';

export interface Allegato extends Document {
  nome: string;
  path: string;
}
