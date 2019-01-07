import * as express from "express";
import PrenotazioniController from "../controllers/PrenotazioniController";
import prenotazioni from "../data/prenotazioni";
const router = express.Router();

router.get("/", (req, res) =>
  res.send(`<h1 style="text-align:center">Jack Router</h1>`)
);

prenotazioni.forEach((p) =>
  PrenotazioniController.associaPrenotazioneAnnullata(p)
);

export = router; 
