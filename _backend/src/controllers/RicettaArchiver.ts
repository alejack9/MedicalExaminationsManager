import { Ricetta } from "../models/Ricetta";
export class RicettaArchiver {
  constructor() {}

  public CreateRicetta(
    codiceRicetta: string,
    tipoVisita: string,
    regione: string
  ) {
    return new Ricetta(codiceRicetta, tipoVisita, regione);
  }
}
