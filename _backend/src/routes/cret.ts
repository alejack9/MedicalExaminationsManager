import * as express from "express";
import { RicettaController } from "../controllers/RicettaController";
const router = express.Router();

const regioni = ["MA", "LA", "EM"];
const tipo_visita = ["ortopedia", "analisi", "oculista"];
const controller = new RicettaController();

router.get("/", (req, res) => {
  const visita_memorizzata = controller.CheckAll(
    "873648264872888",
    "MA",
    regioni,
    "ortopedia",
    tipo_visita
  );
  console.log("ciao");
  console.log(visita_memorizzata);
  res.send(visita_memorizzata);
});

export = router;
