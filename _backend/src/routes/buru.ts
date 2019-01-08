import * as express from "express";
import PrenotazioniController from "../controllers/PrenotazioniController";
import Patient from "../models/Patient";
import Prenotazione from "../models/Prenotazione";
import Ricetta from "../models/Ricetta";
import Visita from "../models/Visita";
import Tools from "../utils/tools";

const router = express.Router();
const logger = Tools.Instance.getLogger("app:visite");

router.use(express.json());
router.get("/", (req, res) => res.send("Buru world"));

router.post("/annullaPrenotazione", (req, res) => {
  const prenotazioneDaAnnullare: Prenotazione = parsePrenotazione(req.body);
  PrenotazioniController.annullaPrenotazione(prenotazioneDaAnnullare);
  res.send("ok");

  /*PrenotazioniController.annullaPrenotazione(JSON.parse(
    req.body
  ) as Prenotazione);
  res.send("ok");
*/
});

function parsePrenotazione(prenotazionejson: string): Prenotazione {
  const descrizionePrenotazione = JSON.parse(prenotazionejson);
  /*user o patient?*/
  const paziente = new Patient();
  const visita = new Visita(
    descrizionePrenotazione._visita._tipoVisita,
    descrizionePrenotazione._visita._effettuata,
    descrizionePrenotazione._visita._pagata,
    paziente,
    new Ricetta(
      descrizionePrenotazione._visita.ricetta._codiceRicetta,
      descrizionePrenotazione._visita.ricetta._tipoVisita
    ),
    descrizionePrenotazione._visita._struttura,
    descrizionePrenotazione._visita._priorita,
    descrizionePrenotazione._visita._medico
  );

  const PrenotazioneDaAnnullare = new Prenotazione(
    visita,
    descrizionePrenotazione._data,
    descrizionePrenotazione._annullata
  );
  return PrenotazioneDaAnnullare;
}

export = router;
