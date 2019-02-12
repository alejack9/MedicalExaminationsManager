import { Schema } from 'mongoose';

const PazienteSchema = new Schema({
  reputazione: { type: Schema.Types.Number, required: true },
});

export { PazienteSchema };
