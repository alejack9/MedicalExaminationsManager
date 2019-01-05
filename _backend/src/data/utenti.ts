import User from "../models/User";
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
export default utenti;
