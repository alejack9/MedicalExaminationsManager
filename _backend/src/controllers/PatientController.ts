import Patient from "../models/Patient";
import Tools from "../utils/tools";

export default class PatientController {
  public static abbassaReputazione(paziente: Patient, data: Date): number {
    paziente.reputazione = this.calcolaReputazione(paziente.reputazione, data);

    Tools.Instance.getLogger("app:visite")(
      `La nuova reputazione del paziente è ${paziente.reputazione}`
    );
    return paziente.reputazione;
  }
  private static calcolaReputazione(reputazione: number, data: Date): number {
    const diff = data.valueOf() - new Date(Date.now()).valueOf();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    const rep = reputazione - 200 / days;
    return +rep.toFixed(3);
  }
}
