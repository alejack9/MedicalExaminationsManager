import { Prenotazione } from '../classes/prenotazione';
import { TipoNotifica } from '../enumerations/tipoNotifica.enumeration';

export class Notifica {
  prenotazione: Prenotazione;
  data: Date;
}
