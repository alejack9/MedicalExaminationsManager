import visite from "../data/visite";
import { Visita } from "../models/Visita";

export default abstract class VisitaGetter {
  public static ottieniListaPrenotazioni(
    visita: Visita,
    dataInizio: Date
  ): Visita[] {
    return visite.filter(
      (v) =>
        v.pagata === false &&
        v.effettuata === false &&
        v.tipoVisita === visita.tipoVisita &&
        v.data >= dataInizio &&
        !v.equals(visita)
    );
  }
}
