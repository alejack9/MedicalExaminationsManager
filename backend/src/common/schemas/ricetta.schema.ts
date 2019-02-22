import { Schema } from 'mongoose';
import { TipoVisitaSchema } from './tipoVisita.schema';
import { PatientSchema } from './patient.schema';

const RicettaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  codiceRicetta: { type: Schema.Types.String, required: true },
  tipoVisita: { type: TipoVisitaSchema, required: true },
  paziente: { type: PatientSchema, required: true },
  priorita: { type: Schema.Types.Number, required: true },
  esenzione: { type: Schema.Types.Boolean, required: true },
  utilizzabile: { type: Schema.Types.Boolean, required: true },
});

export { RicettaSchema };
