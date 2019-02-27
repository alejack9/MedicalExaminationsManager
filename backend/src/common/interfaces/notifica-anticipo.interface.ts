import { Notifica } from './notifica.interface';
import { Prenotazione } from './prenotazione.interface';

export interface NotificaAnticipo extends Notifica {
    prenotazioneAnticipata: Prenotazione;
}
