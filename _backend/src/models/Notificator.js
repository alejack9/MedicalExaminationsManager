let Notifica = require("./Notifica");

class Notificator {
  creaNotifica(testo, visita, tipo) {
    const notifica = new Notifica(testo, visita, tipo);
    return testo;
  }
}

module.exports = Notificator;
