import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface Allegato extends Document {
  _id: ObjectId;
  nome: string;
  path: string;
}
