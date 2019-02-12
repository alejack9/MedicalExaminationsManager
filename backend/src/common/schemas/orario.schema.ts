import { Schema } from 'mongoose';
import { TipoVisitaSchema } from './tipoVisita.schema';

const OrarioSchema = new Schema({
  inizio: { type: Schema.Types.Date, required: true },
  fine: { type: Schema.Types.Date, required: true },
  tipo: { type: TipoVisitaSchema, required: true },
  struttura: { type: Schema.Types.ObjectId, ref: 'Structure' },
});

export { OrarioSchema };
