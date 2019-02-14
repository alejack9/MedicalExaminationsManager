import { Document, Types } from 'mongoose';

export interface Assenza extends Document {
  intervallo: {inizio: Date, fine: Date};
  motivazione: string;
  struttura: Types.ObjectId;
}
