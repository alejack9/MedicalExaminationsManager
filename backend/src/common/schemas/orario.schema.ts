import { Schema } from 'mongoose';

const OrarioSchema = new Schema({
  inizio: { type: Schema.Types.Date, required: true },
  fine: { type: Schema.Types.Date, required: true },
  tipo: {
    type: Schema.Types.ObjectId,
    ref: 'Reservation-type',
    required: true,
  },
  struttura: { type: Schema.Types.ObjectId, ref: 'Structure' },
});

export { OrarioSchema };
