import { AllegatoSchema } from './allegato.schema';

import { Schema } from 'mongoose';

const RefertoSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  nome: { type: Schema.Types.String, required: true },
  path: { type: Schema.Types.String, required: true },
  allegato: [AllegatoSchema],
});

export { RefertoSchema };
