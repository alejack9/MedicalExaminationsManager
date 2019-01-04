const RicettaController = require("./controllers/RicettaController");

var express = require("express");
var app = express();
//var ricetta= new Ricetta('873648264872', 'ortopedia', 'MA');
var regioni = ["MA", "LA", "EM"];
var tipo_visita = ["ortopedia", "analisi", "oculista"];
var controller = new RicettaController();

app.get("/", function(req, res) {
  var visita_memorizzata = controller.CheckAll(
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

app.listen(3001, () => console.log("Listening on port 3000.."));
