import * as _ from "underscore";
import Tools from "../asset/tools";
import Patient from "../models/Patient";
import User from "../models/User";
import Visita from "../models/Visita";
import Notificator from "./Notificator";
import PatientController from "./PatientController";
import VisitaGetter from "./VisitaGetter";

const logger = Tools.Instance.getLogger("app:visite");

export default abstract class PrenotazioniController {
  public static annullaPrenotazione(prenotazione: string): void {
    try {
      const descrizionePrenotazione = JSON.parse(prenotazione);
      const p = descrizionePrenotazione._paziente;
      const visitaDaAnnullare = new Visita(
        descrizionePrenotazione._tipoVisita,
        descrizionePrenotazione._effettuata,
        descrizionePrenotazione._priorita,
        descrizionePrenotazione._pagata,
        new Date(descrizionePrenotazione._data),
        new Patient(new User(p._name, p._surname, p._address, p._birthdate))
      );

      const rep: number = PatientController.abbassaReputazione(
        visitaDaAnnullare.paziente,
        visitaDaAnnullare.data
      );

      this.associaVisitaAnnullata(visitaDaAnnullare);
    } catch (e) {
      logger(e.message);
    }
  }
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
