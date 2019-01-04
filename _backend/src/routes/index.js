let express = require("express");
let app = express();
let notifica = false;
let al = [1, 2, 3];
let RefertoManager = require("../public/javascripts/RefertoManager");
let Visita = require("../public/javascripts/Visita");

const manager = new RefertoManager();
const visita = new Visita("Cardiologo", false, false, NaN);

app.put("/", function(req, res) {
  notifica = manager.carica(visita, "Referto", "ciao", al);

  if (notifica == true) {
    res.send("done");
  }

  res.send("OK");
});

module.exports = app;
