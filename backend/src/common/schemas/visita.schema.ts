import { Schema } from 'mongoose';
import { RefertoSchema } from './referto.schema';

const VisitaSchema = new Schema({
  pagata: { type: Schema.Types.Boolean, required: true },
  referto: { type: RefertoSchema, required: false },
  ricetta: { type: Schema.Types.ObjectId, ref: 'Prescription', required: true },
  medico: { type: Schema.Types.ObjectId, ref: 'Office-doctor', required: true },
  dataInizio: { type: Schema.Types.Date, required: false },
  dataFine: { type: Schema.Types.Date, required: false },
});

export { VisitaSchema };
