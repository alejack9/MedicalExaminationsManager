import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface IPatient extends Document {
  _id: ObjectId;
  reputazione: number;
}
