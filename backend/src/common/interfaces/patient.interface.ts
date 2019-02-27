import { Document } from 'mongoose';

export interface Patient extends Document {
  reputazione: number;
}
