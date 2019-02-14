import { Document, Types } from 'mongoose';

export interface Assenza extends Document {
  intervallo: [Date];
  motivazione: string;
  struttura: Types.ObjectId;
}
