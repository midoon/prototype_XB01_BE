import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import CorsConfig from "../types/cors.type";
import healthRouter from "../routes/health.route";

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsConfig: CorsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(healthRouter);

export default app;
