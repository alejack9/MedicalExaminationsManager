import Notificator from "../controllers/Notificator";
import Allegato from "../models/Allegato";
import Prenotazione from "../models/Prenotazione";
import Referto from "../models/Referto";
import { TipoNotifica } from "../models/TipoNotifica";
import VisiteController from "./VisiteController";

export default class RefertoManager {
  public aggiungiReferto(
    nome: string,
    path: string,
    allegati: Allegato[],
    prenotazione: Prenotazione
  ) {
    const referto = new Referto(nome, path, allegati);

    VisiteController.addReferto(prenotazione.visita, referto);

    return Notificator.creaNotifica(prenotazione, TipoNotifica.referto);
  }
}
