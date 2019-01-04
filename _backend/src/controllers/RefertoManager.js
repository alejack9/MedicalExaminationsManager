let Referto = require("../models/Referto");
let ControllerVisite = require("./ControllerVisite");
let Notificator = require("../models/Notificator");
let notifica;

class RefertoManager {
  carica(visita, name, file, allegati) {
    let caricato = 0;
    const referto = new Referto(name, file);

    if (allegati.length > 0) referto.allegati = allegati;

    const cv = new ControllerVisite();
    caricato = cv.addReferto(visita, referto);

    if (caricato === 1) {
      const n = new Notificator();
      notifica = n.creaNotifica("Referto Caricato", visita, "refertoCaricato");
    }

    return notifica;
  }
}

module.exports = RefertoManager;
