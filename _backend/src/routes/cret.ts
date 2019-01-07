import * as express from "express";
import RicettaController from "../controllers/RicettaController";
import Tools from "../utils/tools";
const logger = Tools.Instance.getLogger("app:Ricetta");
const router = express.Router();

const regioni = ["MA", "LA", "EM"];
const tipo_visita = ["ortopedia", "analisi", "oculista"];

router.get("/", (req, res) => {
  const visita_memorizzata = RicettaController.checkAll(
    "873648264872888",
    "ortopedia"
  );
  logger("ciao");
  logger(visita_memorizzata);
  res.send(visita_memorizzata);
});

export = router;
