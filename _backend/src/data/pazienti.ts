import Patient from "../models/Patient";
import utenti from "./utenti";

const pazienti = [
  new Patient(utenti[0]),
  new Patient(utenti[1]),
  new Patient(utenti[2]),
  new Patient(utenti[3])
];
pazienti[0].reputazione = 20;
pazienti[1].reputazione = 20;
pazienti[2].reputazione = 10;
pazienti[3].reputazione = 10;

export default pazienti;
