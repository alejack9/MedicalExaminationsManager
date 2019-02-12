import { Struttura } from './struttura';
import { Visita } from './visita';

export class Prenotazione {
  visita: Visita;
  data: Date;
  annullata: boolean;
  struttura: Struttura;

  /**
 * annulla
  : boolean
  */
  public annulla(salvaRicetta: boolean): boolean {
    this.annullata = true;
    this.visita.cancellaRicetta(salvaRicetta);
    return this.annullata;
  }
}
