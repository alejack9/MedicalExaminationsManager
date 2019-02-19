import { Schema } from 'mongoose';

const OfficeDoctorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  nome: { type: Schema.Types.String, required: true },
  cognome: { type: Schema.Types.String, required: true },

  specializzazione: { type: Schema.Types.String, required: true },
});

export { OfficeDoctorSchema };
