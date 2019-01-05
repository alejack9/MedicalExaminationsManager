import * as express from "express";
import * as cretRouter from "./routes/cret";
const app = express();
// var ricetta= new Ricetta('873648264872', 'ortopedia', 'MA');
app.use("/cret", cretRouter);

app.listen(3001, () => console.log("Listening on port 3000.."));
