import { Notifica } from "../models/Notifica";
import { Visita } from "./Visita";

export class Notificator {
  public creaNotifica(testo: string, visita: Visita, tipo: string) {
    const notifica = new Notifica(testo, visita, tipo);
    return notifica;
  }
}
