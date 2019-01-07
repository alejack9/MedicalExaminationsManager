import Notificator from "../controllers/Notificator";
import PrenotazioniGetter from "../controllers/PrenotazioniGetter";
import Assenza from "../models/Assenza";
import OfficeDoctor from "../models/OfficeDoctor";
import { TipoNotifica } from "../models/TipoNotifica";

export default class AssenzaController {
  public creaAssenza(
    intervallo: Date[],
    motivazione: string = "",
    officeDoctor: OfficeDoctor
  ) {
    if (this.checkIntervallo(intervallo)) {
      const assenza = new Assenza(intervallo, motivazione, officeDoctor);

      for (const data of intervallo) {
        for (const prenotazione of PrenotazioniGetter.getPrenotazioniDottore(
          data,
          officeDoctor
        )) {
          Notificator.creaNotifica(prenotazione, TipoNotifica.assenza);
        }
      }
    }
  }
  public checkIntervallo(interv: Date[]) {
    return interv[0] <= interv[1];
  }
}
