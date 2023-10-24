import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import { accessChat, fetchChat } from "../controllers/chat.controller";

const chatRouter: Router = Router();

chatRouter.post("/api/chat", authMiddleware, accessChat);
chatRouter.get("/api/chat", authMiddleware, fetchChat);

export default chatRouter;
