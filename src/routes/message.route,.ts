import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import { sendMessage } from "../controllers/message.controller";

const messageRouter: Router = Router();
messageRouter.use(authMiddleware);
messageRouter.post("/api/message", sendMessage);

export default messageRouter;
