const Ricetta = require("../models/Ricetta");

class RicettaArchiver {
  constructor() {}

  CreateRicetta(codiceRicetta, tipoVisita, regione) {
    return new Ricetta(codiceRicetta, tipoVisita, regione);
  }
}

module.exports = RicettaArchiver;
