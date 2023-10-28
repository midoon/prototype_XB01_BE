import { Router } from "express";
import { authMiddleware } from "../middleware/user.middleware";
import {
  accessChat,
  addMemberGroup,
  createGroup,
  fetchChat,
  removeMemberGroup,
  renameGroup,
} from "../controllers/chat.controller";

const chatRouter: Router = Router();
chatRouter.use(authMiddleware);
chatRouter.post("/api/chat", accessChat);
chatRouter.get("/api/chat", fetchChat);
chatRouter.post("/api/chat/group", createGroup);
chatRouter.put("/api/chat/group/rename", renameGroup);
chatRouter.put("/api/chat/group/remove", removeMemberGroup);
chatRouter.put("/api/chat/group/add", addMemberGroup);

export default chatRouter;
