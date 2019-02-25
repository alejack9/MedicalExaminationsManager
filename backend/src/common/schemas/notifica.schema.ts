import { Schema } from 'mongoose';

export const NotificaSchema = new Schema({
  prenotazione: {
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  data: { type: Schema.Types.Date, required: true },
});
