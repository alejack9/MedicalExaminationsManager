import * as express from "express";
import PrenotazioniController from "../controllers/PrenotazioniController";
import visite from "../data/visite";
const router = express.Router();

router.get("/", (req, res) =>
  res.send(`<h1 style="text-align:center">Jack Router</h1>`)
);

visite.forEach((v) => PrenotazioniController.associaVisitaAnnullata(v));

export = router;
