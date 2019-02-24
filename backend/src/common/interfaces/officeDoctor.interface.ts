import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface OfficeDoctor extends Document {
  _id: ObjectId;
  nome: string;
  cognome: string;
  id: number;
  specializzazione: string;
}
