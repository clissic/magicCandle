// IMPORT CONFIGS
import express from "express";
import MongoStore from "connect-mongo";
import cors from "cors";
import handlebars from "express-handlebars";
import path from "path";
import env from "./config/env.config.js";
import { __dirname } from "./config.js";
import { logger } from "./utils/logger.js";
import { connectMongo } from "./utils/db-connection.js";
// IMPORT ROUTERS

const app = express();
const PORT = env.port;

const httpServer = app.listen(PORT, () => {
  logger.info(`App running on ${__dirname} - server http://localhost:${PORT}`);
});

connectMongo();

app.use(cors());
app.use(compression());

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// RENDERS
app.use("/", homeRouter);

app.get("*", (req, res) => {
  return res
    .status(404)
    .render("errorPage", { msg: "Error 404, página no encontrada.", user });
});

console.log(__dirname)