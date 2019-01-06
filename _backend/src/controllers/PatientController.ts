import Tools from "../asset/tools";
import Patient from "../models/Patient";
import User from "../models/User";

export default class PatientController {
  public static abbassaReputazione(paziente: User, data: Date): number {
    if (paziente.getRuolo(Patient) !== null) {
      let newrep: number;
      newrep = PatientController.calcolaReputazione(
        paziente.getRuolo(Patient).reputazione,
        data
      );
      paziente.getRuolo(Patient).reputazione = newrep;

      Tools.Instance.getLogger("app:visite")(
        `La nuova reputazione del paziente è ${
          paziente.getRuolo(Patient).reputazione
        }`
      );

      return paziente.getRuolo(Patient).reputazione;
    } else {
      throw new Error("aaa");
    }
  }
  private static calcolaReputazione(reputazione: number, data: Date): number {
    const diff = data.valueOf() - new Date(Date.now()).valueOf();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    const rep = reputazione - 200 / days;
    return +rep.toFixed(3);
  }
}
