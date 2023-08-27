import { Router } from "express";
import { healtController } from "../controllers/health.controller";

const healthRouter: Router = Router();

healthRouter.get("/", healtController);

export default healthRouter;
