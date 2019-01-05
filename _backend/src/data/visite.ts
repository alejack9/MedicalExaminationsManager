import Visita from "../models/Visita";
import pazienti from "./pazienti";

const visite = [
  new Visita(
    "oculistica",
    false,
    2,
    false,
    new Date(2019, 3, 10, 9, 0),
    pazienti[0]
  ),
  new Visita(
    "oculistica",
    false,
    1,
    false,
    new Date(2019, 4, 12, 9, 0),
    pazienti[1]
  ),
  new Visita(
    "oculistica",
    false,
    2,
    false,
    new Date(2019, 4, 1, 9, 0),
    pazienti[2]
  ),
  new Visita(
    "oculistica",
    false,
    2,
    false,
    new Date(2019, 4, 1, 10, 0),
    pazienti[3]
  ),
  new Visita(
    "odontoriatica",
    false,
    1,
    false,
    new Date(2019, 3, 10, 9, 0),
    pazienti[0]
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    new Date(2019, 4, 12, 9, 0),
    pazienti[1]
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    new Date(2019, 4, 1, 9, 0),
    pazienti[2]
  ),
  new Visita(
    "odontoriatica",
    false,
    2,
    false,
    new Date(2019, 4, 1, 10, 0),
    pazienti[3]
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    new Date(2019, 3, 10, 9, 0),
    pazienti[0]
  ),
  new Visita(
    "radiologica",
    false,
    1,
    false,
    new Date(2019, 3, 9, 9, 0),
    pazienti[1]
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    new Date(2019, 4, 1, 9, 0),
    pazienti[2]
  ),
  new Visita(
    "radiologica",
    false,
    2,
    false,
    new Date(2019, 4, 1, 10, 0),
    pazienti[3]
  )
];

// Tools.Instance.getLogger("app:visite")("Elenco visite:");
// visite.forEach((v) => Tools.Instance.getLogger("app:visite")(v));

export default visite;
