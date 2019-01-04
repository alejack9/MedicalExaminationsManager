import { Referto } from "../models/Referto";
import { Visita } from "../models/Visita";

export abstract class ControllerVisite {
  public static addReferto(visita: Visita, referto: Referto) {
    visita.referto = referto;
    return true;
  }
}
