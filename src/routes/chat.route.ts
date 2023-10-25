import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import {
  accessChat,
  createGroup,
  fetchChat,
} from "../controllers/chat.controller";

const chatRouter: Router = Router();
chatRouter.use(authMiddleware);
chatRouter.post("/api/chat", accessChat);
chatRouter.get("/api/chat", fetchChat);
chatRouter.post("/api/chat/group", createGroup);

export default chatRouter;
