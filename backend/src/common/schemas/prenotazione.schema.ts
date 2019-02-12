import { Schema } from 'mongoose';

const OrarioSchema = new Schema({
  visita: { type: Schema.Types.ObjectId, ref: 'Examination' },
  data: { type: Schema.Types.Date, required: true },
  annullata: { type: Schema.Types.Boolean, required: true },
  struttura: { type: Schema.Types.ObjectId, ref: 'Structure' },
});

export { OrarioSchema };
