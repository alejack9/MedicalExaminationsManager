import Ricetta from "../models/Ricetta";
import Visita from "../models/Visita";

import OfficeDoctor from "../models/OfficeDoctor";
import Patient from "../models/Patient";
import utenti from "./utenti";

const visite = [
  new Visita(
    "oculistica",
    false,
    false,
    utenti[0].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "oculistica",
    false,
    false,
    utenti[1].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    1,
    new OfficeDoctor()
  ),
  new Visita(
    "oculistica",
    false,
    false,
    utenti[2].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "oculistica",
    false,
    false,
    utenti[3].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "odontoriatica",
    false,
    false,
    utenti[0].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    1,
    new OfficeDoctor()
  ),
  new Visita(
    "odontoriatica",
    false,
    false,
    utenti[1].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "odontoriatica",
    false,
    false,
    utenti[2].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "odontoriatica",
    false,
    false,
    utenti[3].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "radiologica",
    false,
    false,
    utenti[0].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "radiologica",
    false,
    false,
    utenti[1].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    1,
    new OfficeDoctor()
  ),
  new Visita(
    "radiologica",
    false,
    false,
    utenti[2].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  ),
  new Visita(
    "radiologica",
    false,
    false,
    utenti[3].getRuolo(new Patient()) as Patient,
    new Ricetta("", ""),
    "",
    2,
    new OfficeDoctor()
  )
];

// Tools.Instance.getLogger("app:visite")("Elenco visite:");
// visite.forEach((v) => Tools.Instance.getLogger("app:visite")(v));

export default visite;
