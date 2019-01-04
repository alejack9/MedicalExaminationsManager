import { Patient } from "../models/Patient";
import { Visita } from "../models/Visita";
import { PatientController } from "./PatientController";
import { VisitaGetter } from "./VisitaGetter";
import { VisitaManager } from "./VisitaManager";

export class PrenotazioniController {
    public static annullaPrenotazione(prenotazione: string): boolean {
        let visitaDaAnnullare: Visita;
        visitaDaAnnullare = JSON.parse(prenotazione);
        // cerco la visita ?

        PatientController.abbassaReputazione(visitaDaAnnullare.paziente, visitaDaAnnullare.data);

        // VisitaManager.Associa(x)

        return true;
    }

    // private cercaPrenotazione(prenotazione: string): boolean {

  //  }
}
