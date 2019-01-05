import * as express from "express";
import VisitaManager from "../controllers/VisitaManager";
import visite from "../data/visite";
const router = express.Router();

router.get("/", (req, res) =>
  res.send(`<h1 style="text-align:center">Jack Router</h1>`)
);

visite.forEach((v) => VisitaManager.associaVisitaAnnullata(v));

export = router;
