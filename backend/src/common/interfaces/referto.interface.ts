import { Document } from 'mongoose';
import { Allegato } from './allegato.interface';
import { ObjectId } from 'bson';

export interface Referto extends Document {
  _id: ObjectId;
  nome: string;
  path: string;
  allegato: [Allegato];
}
