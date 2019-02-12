import { Schema } from 'mongoose';

const AllegatoSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  path: { type: Schema.Types.String, required: true },
});

export { AllegatoSchema };
