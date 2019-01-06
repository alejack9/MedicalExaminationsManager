import * as express from "express";
import Tools from "../asset/tools";
import PrenotazioniController from "../controllers/PrenotazioniController";
import Patient from "../models/Patient";
import Ricetta from "../models/Ricetta";
import User from "../models/User";
import Visita from "../models/Visita";

const router = express.Router();
const logger = Tools.Instance.getLogger("app:visite");

router.use(express.json());
router.get("/", (req, res) => res.send("Buru world"));

router.post("/annullaVisita", (req, res) => {
  PrenotazioniController.annullaPrenotazione(JSON.stringify(req.body));
  res.send("a");
});
const u = new User("Miguel", "Cerozzi", "via Dante", new Date("13/3/1997"));
u.addRole(new Patient());
logger(
  JSON.stringify(
    new Visita(
      "OCULISTICA",
      false,
      2,
      false,
      "ospedale Roma",
      u.getRuolo(Patient) as Patient,
      new Ricetta("22222", "OCULISTICA")
    )
  )
);
export = router;
