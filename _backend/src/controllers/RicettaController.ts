import regioni from "../data/regioni";
import tipiVisita from "../data/tipiVisita";
import Ricetta from "../models/Ricetta";
import Tools from "../utils/tools";
const logger = Tools.Instance.getLogger("app:ricetta");
export default abstract class RicettaController {

  public static checkAll(codice: string, tipo: string) {
    if (this.checkLunghezzaCodice(codice)) {
      if (this.checkRegione(codice.substr(10, 15))) {
        if (this.checkTipoVisita(tipo)) {
          return new Ricetta(codice, tipo);
        }
      }
    }
  }
  // controllo lunghezza del codice ricetta
  private static checkLunghezzaCodice(codice: string) {
    if (codice.length === 15) {
      logger("ok codice");
      return true;
    } else {
      logger("ciaoooo");
      return false;
    }
  }
  // controllo regione
  private static checkRegione(regione: string) {
    const index = regioni.indexOf(regione);
    if (index >= 0) {
      logger("ok regione");
      return true;
    } else {
      logger("regione non esiste");
      return false;
    }
  }
  // controllo tipo di visita
  private static checkTipoVisita(tipo: string) {
    const index = tipiVisita.indexOf(tipo);
    if (index >= 0) {
      logger("ok tipo visita");
      return true;
    } else {
      logger("tipo visita non esiste");
      return false;
    }
  }
}
