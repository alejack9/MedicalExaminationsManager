import Tools from "./utils/tools";
const config = Tools.Instance.config;
const path = Tools.Instance.path;

import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as buruRouter from "./routes/buru";
import * as cretRouter from "./routes/cret";
import * as giaccheRouter from "./routes/giacche";
import * as miguelRouter from "./routes/miguel";

// general configuration
const port = config.get("port");
const logger = Tools.Instance.getLogger("app:express");
const app = express();

// morgan loading
if (config.get("morgan.enabled")) {
  app.use(morgan(config.get("morgan.format")));
  logger(`Morgan started as '${config.get("morgan.format")}'...`);
}

// helmet loading
if (config.get("helmet.enabled")) {
  app.use(helmet());
  logger(`Helmet started...`);
}

// static loading
app.use(express.static(path.join(__dirname, "..", "public")));
logger(`Public folder in ${path.join(__dirname, "..", "public")}...`);

// routers loading
app.use("/miguel", miguelRouter);
app.use("/cret", cretRouter);
app.use("/buru", buruRouter);
app.use("/giacche", giaccheRouter);

// server starting
app.listen(port, () => logger(`Listening on port ${port}...`));
