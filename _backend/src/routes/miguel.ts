import * as express from "express";
import AssenzaController from "../controllers/AssenzaController";
import RefertoManager from "../controllers/RefertoManager";
import prenotazioni from "../data/prenotazioni";
import Allegato from "../models/Allegato";
import OfficeDoctor from "../models/OfficeDoctor";
import Referto from "../models/Referto";

const router = express.Router();

const al1 = new Allegato("a", "x");
const al2 = new Allegato("b", "y");
const al3 = new Allegato("c", "z");

const al: Allegato[] = [];
al.push(al1, al2, al3);

const date: Date[] = [];
const d1 = new Date("February 02, 2019");
const d2 = new Date("February 08, 2019");
date.push(d1);
date.push(d2);

const referto = new Referto("", "", al);
const officeDoctor = new OfficeDoctor();

const manager = new RefertoManager();
const controller = new AssenzaController();

router.put("/", (req, res) => {
  const notifica = manager.aggiungiReferto(
    "Ref01",
    "ciao",
    al,
    prenotazioni[0]
  );

  if (notifica !== undefined) {
    res.send(notifica);
  }

  res.send("Oh no");
});

router.post("/", (req, res) => {
  const notifica = controller.creaAssenza(date, "malattia", officeDoctor);
  res.send("done");
});

router.get("/", (req, res) => res.send("done"));

export = router;
