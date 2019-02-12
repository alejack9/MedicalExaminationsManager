import { Schema } from 'mongoose';
import { OrarioSchema } from './orario.schema';

const DottoreSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  cognome: { type: Schema.Types.String, required: true },
  orari: [{ type: OrarioSchema, required: true }],
});

export { DottoreSchema };
