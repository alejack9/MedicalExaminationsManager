import { Document } from 'mongoose';
import { Referto } from './referto';
import { Ricetta } from './ricetta';
import { OfficeDoctor } from './officeDoctor';
import { IRicetta } from '../interfaces/ricetta.interface';

export class Visita extends Document {
  pagata: boolean;
  referto: Referto;
  ricetta: Ricetta;
  medico: OfficeDoctor;
  dataInizio: Date;
  dataFine: Date;

  /**
   * cancellaRicetta
 :Ricetta  */
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
}
