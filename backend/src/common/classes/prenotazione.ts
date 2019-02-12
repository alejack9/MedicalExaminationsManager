import { Struttura } from './struttura';
import { Visita } from './visita';

export class Prenotazione {
  private visita: Visita;
  private data: Date;
  private annullata: boolean;
  private struttura: Struttura;

  public annulla(salvaRicetta: boolean): boolean {
    this.annullata = true;
    this.visita.cancellaRicetta(salvaRicetta);
    return this.annullata;
  }
}
