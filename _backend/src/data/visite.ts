import Ricetta from "../models/Ricetta";
import Visita from "../models/Visita";

import pazienti from "./pazienti";

const visite = [
  new Visita(
    "oculistica",
    false,
    2,
    false,
    "",
    pazienti[0],
    new Ricetta("", "")
  ),
  new Visita(
    "oculistica",
    false,
    1,
    false,
    "",
    pazienti[1],
    new Ricetta("", "")
  ),
  new Visita(
    "oculistica",
    false,
    2,
    false,
    "",
    pazienti[2],
    new Ricetta("", "")
  ),
  new Visita(
    "oculistica",
    false,
    2,
    false,
    "",
    pazienti[3],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    1,
    false,
    "",
    pazienti[0],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    "",
    pazienti[1],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    "",
    pazienti[2],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    "",
    pazienti[3],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    "",
    pazienti[0],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    1,
    false,
    "",
    pazienti[1],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    "",
    pazienti[2],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    "",
    pazienti[3],
    new Ricetta("", "")
  )
];

// Tools.Instance.getLogger("app:visite")("Elenco visite:");
// visite.forEach((v) => Tools.Instance.getLogger("app:visite")(v));

export default visite;
