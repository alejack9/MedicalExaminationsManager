import * as _ from "underscore";
import { Visita } from "../models/Visita";
import { Notificator } from "./Notificator";
import { VisitaGetter } from "./VisitaGetter";

export class VisitaManager {
  private visite: Visita[] = [];

  public associaVisitaAnnullata(visita: Visita): boolean {
    this.visite = VisitaGetter.ottieniListaPrenotazioni(visita, visita.data);
    if (!this.recuperaMassimaPriorita()) {
      return false;
    }
    if (this.visite.length > 1) {
      this.recuperaMassimaReputazione();
      if (this.visite.length > 1) {
        this.recuperaDataPiuLontana();
      }
    }
    Notificator.creaNotifica(this.visite[0], visita.data);
    return true;
  }

  private recuperaMassimaPriorita(): boolean {
    if (this.visite.length === 0) {
      return false;
    }
    this.visite = _.pairs(_.groupBy(this.visite, (v) => v.priorita)).sort(
      (e1, e2) => (e1 < e2 ? 1 : -1)
    )[0][1];
    return true;
    // this.visite = this.trovaMassimo("priorita");
    // _.groupBy(this.visite, (v) => v.priorita) as _.Dictionary<Visita[]>;
    // return true;
  }

  private recuperaMassimaReputazione() {
    this.visite = _.pairs(
      _.groupBy(this.visite, (v) => v.paziente.reputazione)
    ).sort((e1, e2) => (e1 < e2 ? 1 : -1))[0][1];
  }

  private recuperaDataPiuLontana() {
    this.visite = _.pairs(_.groupBy(this.visite, (v) => v.data)).sort((e1, e2) =>
      e1 < e2 ? 1 : -1
    )[0][1];
  }

  // private trovaMassimo(attr: string): Visita[] {
  //   let toReturn: Visita[] = [];
  //   let el: Visita | undefined;
  //   while ((el = this.visite.shift())) {
  //     if (el[attr] > toReturn[0][attr]) {
  //       toReturn = [el];
  //     } else if (el[attr] === toReturn[0][attr]) {
  //       toReturn.push(el);
  //     }
  //   }
  //   return toReturn;
  // }
}
