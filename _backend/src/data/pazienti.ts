import Patient from "../models/Patient";

const pazienti = [new Patient(), new Patient(), new Patient(), new Patient()];
pazienti[0].reputazione = 20;
pazienti[1].reputazione = 20;
pazienti[2].reputazione = 10;
pazienti[3].reputazione = 10;

export default pazienti;
