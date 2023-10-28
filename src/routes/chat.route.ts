import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import {
  accessChat,
  createGroup,
  fetchChat,
  renameGroup,
} from "../controllers/chat.controller";

const chatRouter: Router = Router();
chatRouter.use(authMiddleware);
chatRouter.post("/api/chat", accessChat);
chatRouter.get("/api/chat", fetchChat);
chatRouter.post("/api/chat/group", createGroup);
chatRouter.put("/api/chat/group", renameGroup);

export default chatRouter;
