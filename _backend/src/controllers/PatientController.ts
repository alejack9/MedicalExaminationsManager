import { Patient } from "../models/Patient";

export class PatientController {
  public static abbassaReputazione(paziente: Patient, data: Date): number {
    let newrep: number;
    newrep = PatientController.calcolaReputazione(paziente.reputazione, data);
    paziente.reputazione = newrep;
    console.log(paziente.reputazione);

    return newrep;
  }
  private static calcolaReputazione(reputazione: number, data: Date): number {
    // const today = new Date();
    // const diff: number = data.getDate() - today.getDate();
    // console.log(data.getDate());
    return 2;
  }
}
