import { Schema } from 'mongoose';

const VisitaSchema = new Schema({
  codiceRicetta: { type: Schema.Types.String, required: true },
  tipoVisita: { type: Schema.Types.String, required: true },
  paziente: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  priorita: { type: Schema.Types.Number, required: true },
  esenzione: { type: Schema.Types.Boolean, required: true },
  utilizzabile: { type: Schema.Types.Boolean, required: true },
});

export { VisitaSchema };
