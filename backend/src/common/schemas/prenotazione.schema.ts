import { Schema } from 'mongoose';
import { VisitaSchema } from './visita.schema';
import { StrutturaSchema } from './struttura.schema';

const PrenotazioneSchema = new Schema({
  visita: { type: VisitaSchema, required: true },
  data: { type: Schema.Types.Date, required: true },
  annullata: { type: Schema.Types.Boolean, required: true },
  struttura: { type: StrutturaSchema, required: true },
});

export { PrenotazioneSchema };
