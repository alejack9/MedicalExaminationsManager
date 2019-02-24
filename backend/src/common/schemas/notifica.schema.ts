import { Schema } from 'mongoose';
import { PrenotazioneSchema } from './prenotazione.schema';

export const NotificaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  prenotazione: { type: Schema.Types.ObjectId, required: true },
  data: { type: Schema.Types.Date, required: true },
});
