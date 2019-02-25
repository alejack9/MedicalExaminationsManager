import { Schema } from 'mongoose';

const TipoVisitaSchema = new Schema({
  nome: { type: Schema.Types.String, required: true },
  minutiVisita: { type: Schema.Types.Number, required: true },
});

export { TipoVisitaSchema };
