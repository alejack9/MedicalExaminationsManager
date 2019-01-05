import * as _ from "underscore";
import Tools from "../asset/tools";
import { Visita } from "../models/Visita";
import Notificator from "./Notificator";
import VisitaGetter from "./VisitaGetter";

export default abstract class VisitaManager {
  public static associaVisitaAnnullata(visita: Visita): void {
    this.printVisita("Annullata", visita);
    this.visite = VisitaGetter.ottieniListaPrenotazioni(visita, visita.data);
    this.visite = this.visite.filter((v) => !v.paziente.equals(visita.paziente));

    if (!this.recuperaMassimaPriorita()) {
      this.printVisita("Selezionata", null);
      return;
    }
    if (this.visite.length > 1) {
      this.recuperaMassimaReputazione();
      if (this.visite.length > 1) {
        this.recuperaDataPiuLontana();
      }
    }
    this.printVisita("Selezionata", this.visite[0]);
    Notificator.creaNotifica(this.visite[0], visita.data);
  }

  private static visite: Visita[] = [];

  private static recuperaMassimaPriorita(): boolean {
    if (this.visite.length === 0) {
      return false;
    }
    this.visite = _.pairs(_.groupBy(this.visite, (v) => v.priorita)).sort(
      (e1, e2) => (e1[0] < e2[0] ? 1 : -1)
    )[0][1];
    return true;
  }

  private static recuperaMassimaReputazione() {
    this.visite = _.pairs(
      _.groupBy(this.visite, (v) => v.paziente.reputazione)
    ).sort((e1, e2) => (e1[0] < e2[0] ? 1 : -1))[0][1];
  }

  private static recuperaDataPiuLontana() {
    this.visite = _.pairs(_.groupBy(this.visite, (v) => v.data)).sort((e1, e2) =>
      e1[0] < e2[0] ? 1 : -1
    )[0][1];
  }

  private static printVisita(tipo: string, visita: Visita | null) {
    Tools.Instance.getLogger("app:visite")(`Visita ${tipo}:`);
    Tools.Instance.getLogger("app:visite")(visita ? visita : "NESSUNA");
    Tools.Instance.getLogger("app:visite")(`-----------------------`);
  }
}
