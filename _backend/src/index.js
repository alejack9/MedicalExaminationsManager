let express = require("express");
let app = express();
let notifica = NaN;
let al = [1, 2, 3];
let RefertoManager = require("./controllers/RefertoManager");
let Visita = require("./models/Visita");

const manager = new RefertoManager();
const visita = new Visita("Cardiologo", false, false, NaN);

app.put("/", function(req, res) {
  notifica = manager.carica(visita, "Referto", "ciao", al);

  if (notifica != NaN) {
    res.send(notifica);
  }

  res.send("OK");
});

app.listen(3000, () => console.log("Ready"));
