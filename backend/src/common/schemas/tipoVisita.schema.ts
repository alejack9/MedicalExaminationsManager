import { Schema } from 'mongoose';

const TipoVisitaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  nome: { type: Schema.Types.String, required: true },
  minutiVisita: { type: Schema.Types.Number, required: true },
});

export { TipoVisitaSchema };
