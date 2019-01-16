import * as _ from "underscore";
import prenotazioni from "../data/prenotazioni";
import Prenotazione from "../models/Prenotazione";
import { TipoNotifica } from "../models/TipoNotifica";
import Tools from "../utils/tools";
import Notificator from "./Notificator";
import PatientController from "./PatientController";
import PrenotazioniGetter from "./PrenotazioniGetter";

const logger = Tools.Instance.getLogger("app:visite");

export default abstract class PrenotazioniController {
  public static annullaPrenotazione(prenotazione: Prenotazione): void {
    if (!prenotazione.visita.effettuata && !prenotazione.visita.pagata) {
      const rep: number = PatientController.abbassaReputazione(
        prenotazione.visita.paziente,
        prenotazione.data
      );
      logger(prenotazione);
      this.associaPrenotazioneAnnullata(prenotazione);
    } else {
      logger(
        "La prenotazione è stata effettuata o pagata e quindi non può essere annullata"
      );
    }
  }
  public static associaPrenotazioneAnnullata(prenotazione: Prenotazione): void {
    this.printVisita("Annullata", prenotazione);
    this.prenotazioni = PrenotazioniGetter.ottieniListaPrenotazioni(
      prenotazione,
      new Date(prenotazione.data.getTime() + 1000 * 60 * 60 * 48)
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

  public static scambiaDate(p1: Prenotazione, p2: Prenotazione): void {
    const dateApp: Date = p1.data;
    p1.data = p2.data;
    p2.data = p1.data;
  }

  public static cancellaVisita(
    prenotazione: Prenotazione,
    mantieniRicetta: boolean
  ): void {
    prenotazione.cancellaVisita(mantieniRicetta);
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
      _.groupBy(this.prenotazioni, (p) => {
        p.visita.getReputazionePaziente();
      })
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
