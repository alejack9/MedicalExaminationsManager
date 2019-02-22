import { Schema } from 'mongoose';
import { PrenotazioneSchema } from './prenotazione.schema';

export const NotificaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  prenotazione: { type: PrenotazioneSchema, required: true },
  reputazione: { type: Schema.Types.String, required: true },
});
