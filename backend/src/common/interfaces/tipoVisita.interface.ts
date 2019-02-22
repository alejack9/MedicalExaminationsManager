import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface TipoVisita extends Document {
  _id: ObjectId;
  nome: string;
  minutiVisita: number;
}
