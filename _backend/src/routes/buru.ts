import * as express from "express";
import PrenotazioniController from "../controllers/PrenotazioniController";
import Prenotazione from "../models/Prenotazione";
import Tools from "../utils/tools";

const router = express.Router();
const logger = Tools.Instance.getLogger("app:visite");

router.use(express.json());
router.get("/", (req, res) => res.send("Buru world"));

router.post("/annullaPrenotazione", (req, res) => {
  PrenotazioniController.annullaPrenotazione(JSON.parse(
    req.body
  ) as Prenotazione);
  res.send("a");
});

// logger(
//   JSON.stringify(
//     new Visita(
//       "OCULISTICA",
//       false,
//       2,
//       false,
//       "ospedale Roma",
//       new User("Miguel", "Cerozzi", "via Dante", new Date("13/3/1997")),
//       new Ricetta("22222", "OCULISTICA")
//     )
//   )
// );
export = router;
