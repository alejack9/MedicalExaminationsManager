import { Schema, Types } from 'mongoose';

const AssenzaSchema = new Schema({
  intervallo: {
    type: { inizio: Schema.Types.Date, fine: Schema.Types.Date },
    required: true,
  },
  motivazione: { type: Schema.Types.String, required: true },
  struttura: { type: Types.ObjectId, ref: 'Structure', required: true },
});

export { AssenzaSchema };
