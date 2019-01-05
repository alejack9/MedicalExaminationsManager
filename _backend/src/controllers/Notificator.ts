import Notifica from "../models/Notifica";
import Visita from "../models/Visita";

export default abstract class Notificator {
  public static creaNotifica(visita: Visita, nuovaData: Date) {
    const newNotifica = new Notifica(visita, "anticipo", nuovaData);
  }
}
