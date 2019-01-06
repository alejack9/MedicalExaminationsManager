import Prenotazione from "../models/Prenotazione";
import visite from "./visite";

const prenotazioni = [
  new Prenotazione(visite[0], new Date(2019, 3, 10, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 12, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 1, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 1, 10, 0), false),
  new Prenotazione(visite[0], new Date(2019, 3, 10, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 12, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 1, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 1, 10, 0), false),
  new Prenotazione(visite[0], new Date(2019, 3, 10, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 3, 9, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 1, 9, 0), false),
  new Prenotazione(visite[0], new Date(2019, 4, 1, 10, 0), false)
];

export default prenotazioni;
