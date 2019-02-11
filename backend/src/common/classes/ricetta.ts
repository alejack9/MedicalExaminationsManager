import { TipoVisita } from './tipoVisita';
import { Patient } from './patient';

export class Ricetta {
  codiceRicetta: string;
  tipoVisita: TipoVisita;
  paziente: Patient;
  priorita: number;
  esenzione: boolean;
  utilizzabile: boolean;
}
