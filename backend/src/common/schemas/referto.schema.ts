import { Schema } from 'mongoose';
import { AllegatoSchema } from './allegato.schema';

const RefertoSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  path: { type: Schema.Types.String, required: true },
  allegati: { type: [AllegatoSchema], required: true },
});

export { RefertoSchema };
