import { Schema } from 'mongoose';

const PatientSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  nome: { type: Schema.Types.String, required: true },
  cognome: { type: Schema.Types.String, required: true },
  id: { type: Schema.Types.Number, required: true },
  codiceFiscale: { type: Schema.Types.String, required: true },
  reputazione: { type: Schema.Types.Number, required: true },
});

export { PatientSchema };
