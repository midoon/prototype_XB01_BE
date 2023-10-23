import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import { accessChat } from "../controllers/chat.controller";

const chatRouter: Router = Router();

chatRouter.post("/api/chat", authMiddleware, accessChat);

export default chatRouter;
