import { Schema } from 'mongoose';

const PatientSchema = new Schema({
  reputazione: { type: Schema.Types.Number, required: true },
});

export { PatientSchema };
