import { Document } from 'mongoose';
import { Referto } from './referto';
import { Ricetta } from './ricetta';
import { OfficeDoctor } from './officeDoctor';

export class Visita extends Document {
  private pagata: boolean;
  private referto: Referto;
  private ricetta: Ricetta;
  private medico: OfficeDoctor;
  private dataInizio: Date;
  private dataFine: Date;

  /**
   * cancellaRicetta
   * :Ricetta
   */
  public cancellaRicetta(salvaRicetta: boolean) {
    if (salvaRicetta === true) {
      const returnRicetta = this.ricetta.trovaRicetta();
      this.ricetta.eliminaRicetta();
      return returnRicetta;
    } else {
      this.ricetta.eliminaRicetta();
      return null;
    }
  }

  public getRicetta() {
    return this.ricetta;
  }

  public getDataInizio() {
    return this.dataInizio;
  }
}
