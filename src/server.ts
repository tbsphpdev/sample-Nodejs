import bodyParser from "body-parser"; // pull information from HTML POST (express4)
import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet"; // Security
import l10n from "jm-ez-l10n";
import jmEzMySql from "jm-ez-mysql";
import methodOverride from "method-override"; // simulate DELETE and PUT (express4)
import morgan from "morgan"; // log requests to the console (express4)
import path from "path";
import { Log } from "./helpers/logger";
import { ResponseBuilder } from "./helpers/responseBuilder";
import fileUpload from "express-fileupload";
import { Routes } from "./routes";
const http = require('http');

dotenv.config();

jmEzMySql.init({
  acquireTimeout: 100 * 60 * 1000,
  connectTimeout: 100 * 60 * 1000,
  connectionLimit: 10000,
  database: process.env.DATABASE,
  dateStrings: true,
  host: process.env.DBHOST,
  multipleStatements: true,
  password: process.env.DBPASSWORD,
  timeout: 100 * 60 * 1000,
  timezone: "utc",
  charset : "utf8mb4",
  user: process.env.DBUSER,
});
export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  private chatSocket = new ChatSocket();

  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
    this.app = express();
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Expose-Headers', 'Content-Length');
      res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });

    this.app.use(morgan("dev")); // log every request to the console
    this.app.use(compression());
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(l10n.enableL10NExpress);
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
    this.app.use(fileUpload());
    this.app.use(methodOverride());
    const routes = new Routes(NODE_ENV);
    this.app.use("/api", routes.path());
    server.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
    });
    }
}
