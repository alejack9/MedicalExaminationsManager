const RicettaArchiver = require("./RicettaArchiver");
const Ricetta = require("../models/Ricetta");

class RicettaController {
  constructor() {}

  //controllo lunghezza del codice ricetta
  CheckLunghezzaCodice(codice) {
    if (codice.length === 15) {
      console.log("ok codice");
      return true;
    } else {
      console.log("ciaoooo");
      return false;
    }
  }
  //controllo regione
  CheckRegione(regione, regioni) {
    var index = regioni.indexOf(regione);
    if (index >= 0) {
      console.log("ok regione");
      return true;
    } else {
      console.log("regione non esiste");
      return false;
    }
  }
  //controllo tipo di visita
  CheckTipoVisita(tipo, visite) {
    var index = visite.indexOf(tipo);
    if (index >= 0) {
      console.log("ok tipo visita");
      return true;
    } else {
      console.log("tipo visita non esiste");
      return false;
    }
  }

  CheckAll(codice, regione, regioni, tipo, visite) {
    if (this.CheckLunghezzaCodice(codice))
      if (this.CheckRegione(regione, regioni))
        if (this.CheckTipoVisita(tipo, visite)) {
          var ricetta = new RicettaArchiver();
          return ricetta.CreateRicetta(codice, tipo, regione);
        }
  }
}

module.exports = RicettaController;
