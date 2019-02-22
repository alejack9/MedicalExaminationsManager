import { Document } from 'mongoose';
import { Prenotazione } from '../classes/prenotazione';
import { ObjectId } from 'bson';

export interface INotifica extends Document {
  _id: ObjectId;
  prenotazione: Prenotazione;
  data: Date;
}
