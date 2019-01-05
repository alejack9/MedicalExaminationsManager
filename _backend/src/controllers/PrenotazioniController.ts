import Patient from "../models/Patient";
import Visita from "../models/Visita";
import PatientController from "./PatientController";

export class PrenotazioniController {
  public static annullaPrenotazione(prenotazione: string): number | undefined {
    try {
      const descrizionePrenotazione = JSON.parse(prenotazione);
      const rp: number = descrizionePrenotazione._paziente._reputazione;
      const visitaDaAnnullare = new Visita(
        descrizionePrenotazione._tipoVisita,
        descrizionePrenotazione._effettuata,
        descrizionePrenotazione._priorita,
        descrizionePrenotazione._pagata,
        new Date(descrizionePrenotazione._data),
        new Patient(rp)
      );
      const rep: number = PatientController.abbassaReputazione(
        visitaDaAnnullare.paziente,
        visitaDaAnnullare.data
      );

      return rep;
    } catch (e) {
      console.log(e.message);
    }

    // VisitaManager.Associa(x)

    // elimina paziente dalla prenotazione
  }
}
