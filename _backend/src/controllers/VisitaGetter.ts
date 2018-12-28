import { Patient } from "../models/Patient";
import { Visita } from "../models/Visita";

const visite = [
  new Visita("", true, 1, true, new Date(Date.now()), new Patient(1)),
  new Visita("", true, 1, true, new Date(Date.now()), new Patient(1)),
  new Visita("", true, 1, true, new Date(Date.now()), new Patient(1)),
  new Visita("", true, 1, true, new Date(Date.now()), new Patient(1))
];

export class VisitaGetter {
  public static ottieniListaPrenotazioni(
    visita: Visita,
    dataInizio: Date
  ): Visita[] {
    return visite.filter((v) => !v.equals(visita) && v.data >= dataInizio);
  }
}
