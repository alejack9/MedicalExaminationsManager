import Ricetta from "../models/Ricetta";
import Visita from "../models/Visita";

import utenti from "./utenti";

const visite = [
  new Visita("oculistica", false, 2, false, "", utenti[0], new Ricetta("", "")),
  new Visita("oculistica", false, 1, false, "", utenti[1], new Ricetta("", "")),
  new Visita("oculistica", false, 2, false, "", utenti[2], new Ricetta("", "")),
  new Visita("oculistica", false, 2, false, "", utenti[3], new Ricetta("", "")),
  new Visita(
    "odontoriatica",
    false,
    1,
    false,
    "",
    utenti[0],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    "",
    utenti[1],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    "",
    utenti[2],
    new Ricetta("", "")
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    "",
    utenti[3],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    "",
    utenti[0],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    1,
    false,
    "",
    utenti[1],
    new Ricetta("", "")
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    "",
    utenti[2],
    new Ricetta("", "")
  ),
  new Visita("radiologica", false, 2, false, "", utenti[3], new Ricetta("", ""))
];

// Tools.Instance.getLogger("app:visite")("Elenco visite:");
// visite.forEach((v) => Tools.Instance.getLogger("app:visite")(v));

export default visite;
