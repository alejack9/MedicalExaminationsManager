import { TipoVisita } from './tipoVisita';
import { Patient } from './patient';
import { RicettaService } from '../../modules/ricetta/ricetta.service';
import { IRicetta } from '../interfaces/ricetta.interface';

export class Ricetta {
  private codiceRicetta: string;
  private tipoVisita: TipoVisita;
  private paziente: Patient;
  private priorita: number;
  private esenzione: boolean;
  private utilizzabile: boolean;

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

  public getPaziente() {
    return this.paziente;
  }

  public getPriorita() {
    return this.priorita;
  }
  public getTipoVisita() {
    return this.tipoVisita;
  }
}
