import Prenotazione from "../models/Prenotazione";
import visite from "./visite";

const prenotazioni = [
  new Prenotazione(visite[0], new Date(2019, 3, 10, 9, 0), false),
  new Prenotazione(visite[1], new Date(2019, 4, 12, 9, 0), false),
  new Prenotazione(visite[2], new Date(2019, 4, 1, 9, 0), false),
  new Prenotazione(visite[3], new Date(2019, 4, 1, 10, 0), false),
  new Prenotazione(visite[4], new Date(2019, 3, 10, 9, 0), false),
  new Prenotazione(visite[5], new Date(2019, 4, 12, 9, 0), false),
  new Prenotazione(visite[6], new Date(2019, 4, 1, 9, 0), false),
  new Prenotazione(visite[7], new Date(2019, 4, 1, 10, 0), false),
  new Prenotazione(visite[8], new Date(2019, 3, 10, 9, 0), false),
  new Prenotazione(visite[9], new Date(2019, 3, 9, 9, 0), false),
  new Prenotazione(visite[10], new Date(2019, 4, 1, 9, 0), false),
  new Prenotazione(visite[11], new Date(2019, 4, 1, 10, 0), false)
];

export default prenotazioni;
