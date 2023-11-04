import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import { allMessage, sendMessage } from "../controllers/message.controller";

const messageRouter: Router = Router();
messageRouter.use(authMiddleware);
messageRouter.post("/api/message", sendMessage);
messageRouter.get("/api/message/:chatId", allMessage);

export default messageRouter;
