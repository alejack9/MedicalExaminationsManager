import { Schema } from 'mongoose';
import { TipoVisitaSchema } from './tipoVisita.schema';

const StrutturaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  nome: { type: Schema.Types.String, required: true },
  indirizzo: { type: Schema.Types.String, required: true },
  tipologia: { type: Schema.Types.String, required: true },
  orari: [Schema.Types.Date],
  tipiVisita: [{ tipoVisita: TipoVisitaSchema, prezzo: Number }],
});

export { StrutturaSchema };
