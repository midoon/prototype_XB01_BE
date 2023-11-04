import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import CorsConfig from "../types/cors.type";
import healthRouter from "../routes/health.route";
import userRouter from "../routes/user.route";
import chatRouter from "../routes/chat.route";
import messageRouter from "../routes/message.route,";

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsConfig: CorsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(healthRouter);
app.use(userRouter);
app.use(chatRouter);
app.use(messageRouter);

export default app;
