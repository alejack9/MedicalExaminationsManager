import { AllegatoSchema } from './allegato.schema';

import { Schema } from 'mongoose';

const RefertoSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  path: { type: Schema.Types.String, required: true },
  allegato: [AllegatoSchema],
});

export { RefertoSchema };
