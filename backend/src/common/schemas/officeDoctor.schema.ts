import { Schema } from 'mongoose';

const OfficeDoctorSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  cognome: { type: Schema.Types.String, required: true },
  id: { type: Schema.Types.Number, required: true },
  specializzazione: { type: Schema.Types.String, required: true },
});

export { OfficeDoctorSchema };
