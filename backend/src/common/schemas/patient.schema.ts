import { Schema } from 'mongoose';

const PatientSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  cognome: { type: Schema.Types.String, required: true },
  id: { type: Schema.Types.Number, required: true },
  reputazione: { type: Schema.Types.Number, required: true },
});

export { PatientSchema };