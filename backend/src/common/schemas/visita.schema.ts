import { Schema } from 'mongoose';
import { RefertoSchema } from './referto.schema';
import { RicettaSchema } from './ricetta.schema';
import { OfficeDoctorSchema } from './officeDoctor.schema';

const VisitaSchema = new Schema({
  pagata: { type: Schema.Types.Boolean, required: true },
  referto: { type: RefertoSchema, required: true },
  ricetta: { type: RicettaSchema, required: true },
  medico: { type: OfficeDoctorSchema, required: true },
  dataInizio: { type: Schema.Types.Date, required: true },
  dataFine: { type: Schema.Types.Date, required: true },
});

export { VisitaSchema };
