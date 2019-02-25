import { Schema } from 'mongoose';
import { TipoVisitaSchema } from './tipo-visita.schema';

const StrutturaSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  indirizzo: { type: Schema.Types.String, required: true },
  tipologia: { type: Schema.Types.String, required: true },
  orari: [Schema.Types.Date],
  tipiVisita: [{ tipoVisita: TipoVisitaSchema, prezzo: Number }],
});

export { StrutturaSchema };
