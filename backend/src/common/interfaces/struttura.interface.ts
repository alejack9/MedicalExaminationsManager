import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface IStruttura extends Document {
  _id: ObjectId;
  nome: string;
  indirizzo: string;
  tipologia: string;
  orari: [Date];
}
