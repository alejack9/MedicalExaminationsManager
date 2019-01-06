import * as _ from "underscore";
import Tools from "../asset/tools";
import prenotazioni from "../data/prenotazioni";
import Patient from "../models/Patient";
import Prenotazione from "../models/Prenotazione";
import Ricetta from "../models/Ricetta";
import { TipoNotifica } from "../models/TipoNotifica";
import User from "../models/User";
import Visita from "../models/Visita";
import Notificator from "./Notificator";
import PatientController from "./PatientController";
import PrenotazioniGetter from "./PrenotazioniGetter";

const logger = Tools.Instance.getLogger("app:visite");

export default abstract class PrenotazioniController {
  public static annullaPrenotazione(prenotazione: string): void {
    try {
      const descrizionePrenotazione = JSON.parse(prenotazione);
      const p = descrizionePrenotazione._paziente;
      const patient = new User(p._name, p._surname, p._address, p._birthdate);
      patient.addRole(new Patient());

      const visita: Visita = new Visita(
        descrizionePrenotazione._visita._tipoVisita,
        descrizionePrenotazione._visita._effettuata,
        descrizionePrenotazione._visita._priorita,
        descrizionePrenotazione._visita._pagata,
        descrizionePrenotazione._visita._struttura,
        patient,
        new Ricetta(
          descrizionePrenotazione._visita.ricetta._codiceRicetta,
          descrizionePrenotazione._visita.ricetta._tipoVisita
        )
      );

      const PrenotazioneDaAnnullare = new Prenotazione(
        visita,
        descrizionePrenotazione._data,
        descrizionePrenotazione._annullata
      );

      const rep: number = PatientController.abbassaReputazione(
        PrenotazioneDaAnnullare.visita.paziente,
        PrenotazioneDaAnnullare.data
      );

      this.associaPrenotazioneAnnullata(visitaDaAnnullare);
    } catch (e) {
      logger(e.message);
    }
  }
  public static associaPrenotazioneAnnullata(prenotazione: Prenotazione): void {
    this.printVisita("Annullata", prenotazione);
    this.prenotazioni = PrenotazioniGetter.ottieniListaPrenotazioni(
      prenotazione,
      prenotazione.data
    );
    this.prenotazioni = this.prenotazioni.filter(
      (p) => !p.visita.paziente.equals(prenotazione.visita.paziente)
    );

    if (!this.recuperaMassimaPriorita()) {
      this.printVisita("Selezionata", null);
      return;
    }
    if (this.prenotazioni.length > 1) {
      this.recuperaMassimaReputazione();
      if (this.prenotazioni.length > 1) {
        this.recuperaDataPiuLontana();
      }
    }
    this.printVisita("Selezionata", this.prenotazioni[0]);
    Notificator.creaNotifica(
      this.prenotazioni[0],
      TipoNotifica.anticipo,
      prenotazione.data
    );
  }

  private static prenotazioni: Prenotazione[] = prenotazioni;

  private static recuperaMassimaPriorita(): boolean {
    if (this.prenotazioni.length === 0) {
      return false;
    }
    this.prenotazioni = _.pairs(
      _.groupBy(this.prenotazioni, (p) => p.visita.priorita)
    ).sort((e1, e2) => (e1[0] < e2[0] ? 1 : -1))[0][1];
    return true;
  }

  private static recuperaMassimaReputazione() {
    this.prenotazioni = _.pairs(
      _.groupBy(this.prenotazioni, (p) => p.visita.paziente.reputazione)
    ).sort((e1, e2) => (e1[0] < e2[0] ? 1 : -1))[0][1];
  }

  private static recuperaDataPiuLontana() {
    this.prenotazioni = _.pairs(_.groupBy(this.prenotazioni, (p) => p.data)).sort(
      (e1, e2) => (e1[0] < e2[0] ? 1 : -1)
    )[0][1];
  }

  private static printVisita(tipo: string, prenotazione: Prenotazione | null) {
    Tools.Instance.getLogger("app:visite")(`Prenotazione ${tipo}:`);
    Tools.Instance.getLogger("app:visite")(
      prenotazione ? prenotazione : "NESSUNA"
    );
    Tools.Instance.getLogger("app:visite")(`-----------------------`);
  }
}
