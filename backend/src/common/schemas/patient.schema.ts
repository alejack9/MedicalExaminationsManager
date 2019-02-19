import { Schema } from 'mongoose';

const PatientSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  reputazione: { type: Schema.Types.Number, required: true },
});

export { PatientSchema };
