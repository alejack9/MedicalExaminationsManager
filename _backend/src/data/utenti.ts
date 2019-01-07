import User from "../models/User";
import pazienti from "./pazienti";

const utenti = [
  new User(
    "Victor",
    "Newman",
    "7436 Schoolhouse St. Lumberton, NC 28358",
    new Date(1997, 4, 7)
  ),
  new User(
    "Cameron",
    "Morrison",
    "8004 Glenholme Ave. Owosso, MI 48867",
    new Date(1999, 0, 5)
  ),
  new User(
    "Emily",
    "MacLeod",
    "9171 Bradford Avenue Chapel Hill, NC 27516",
    new Date(1999, 3, 17)
  ),
  new User(
    "Carolyn",
    "Mitchell",
    "8364 Prince St. Bangor, ME 04401",
    new Date(1999, 7, 15)
  )
];
utenti[0].addRole(pazienti[0]);
utenti[1].addRole(pazienti[1]);
utenti[2].addRole(pazienti[2]);
utenti[3].addRole(pazienti[3]);

export default utenti;
