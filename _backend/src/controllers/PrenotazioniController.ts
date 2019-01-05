import Tools from "../asset/tools";
import Patient from "../models/Patient";
import User from "../models/User";
import Visita from "../models/Visita";
import PatientController from "./PatientController";
import VisitaManager from "./VisitaManager";

const logger = Tools.Instance.getLogger("app:visite");

export default class PrenotazioniController {
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

      VisitaManager.associaVisitaAnnullata(visitaDaAnnullare);
    } catch (e) {
      logger(e.message);
    }
    // elimina paziente dalla prenotazione
  }
}
