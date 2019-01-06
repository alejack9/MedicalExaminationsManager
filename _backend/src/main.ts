import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as miguelRouter from "./routes/miguel";
import * as cretRouter from "./routes/cret";

const port = config.get("port");
const logger = debug("app:startup");

const app = express();

if (config.get("morgan.enabled")) {
  app.use(morgan(config.get("morgan.format")));
  logger(`Morgan started as '${config.get("morgan.format")}'...`);
}

if (config.get("helmet.enabled")) {
  app.use(helmet());
  logger(`Helmet started...`);
}

app.use(express.static(path.join(__dirname, "..", "public")));
logger(`Public folder in ${path.join(__dirname, "..", "public")}...`);

app.use("/miguel", miguelRouter);
app.use("/cret", cretRouter);

app.listen(port, () => logger(`Listening on port ${port}...`));