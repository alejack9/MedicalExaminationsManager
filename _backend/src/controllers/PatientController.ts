import { Patient } from "../models/Patient";

export class PatientController {
  public static abbassaReputazione(paziente: Patient, data: Date): number {
    let newrep: number;
    newrep = PatientController.calcolaReputazione(paziente.reputazione, data);
    paziente.reputazione = newrep;

    console.log(paziente.reputazione);

    return paziente.reputazione;
  }
  private static calcolaReputazione(reputazione: number, data: Date): number {
    const diff = data.valueOf() - new Date(Date.now()).valueOf();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    const rep = reputazione - 200 / days;
    return +(rep.toFixed(3));
  }
}
