import { Schema } from 'mongoose';
import { TipoNotifica } from '../enumerations/tipoNotifica.enumeration';

export const NotificaSchema = new Schema({
  prenotazione: {
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  letta: { type: Schema.Types.Boolean, default: false, required: true },
  tipo: { type: TipoNotifica, required: true},
  prenotazioneAnticipata: {
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
    required: false,
  },
  data: { type: Schema.Types.Date, required: true },
});
