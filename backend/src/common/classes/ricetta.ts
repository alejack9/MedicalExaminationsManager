import { TipoVisita } from './tipoVisita';
import { Patient } from './patient';
import { RicettaService } from '../../modules/ricetta/ricetta.service';
import { IRicetta } from '../interfaces/ricetta.interface';

export class Ricetta {
  codiceRicetta: string;
  tipoVisita: TipoVisita;
  paziente: Patient;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;

  /**
   * eliminaRicetta
   */
  public eliminaRicetta() {
    const rs: RicettaService = null;
    rs.eliminaRicetta(this.codiceRicetta);
  }

  public trovaRicetta(): Promise<IRicetta[]> {
    const ricettaS: RicettaService = null;
    return ricettaS.trovaRicetta(this.codiceRicetta);
  }
}
