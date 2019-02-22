import { Schema } from 'mongoose';

const AllegatoSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  nome: { type: Schema.Types.String, required: true },
  path: { type: Schema.Types.String, required: true },
});

export { AllegatoSchema };
