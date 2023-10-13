import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/user.middleware";

const userRouter: Router = Router();

userRouter.post("/api/user/register", register);
userRouter.post("/api/user/login", login);
userRouter.post("/api/user/refresh", refreshToken);
userRouter.post("/api/user/logout", authMiddleware, logout);

export default userRouter;
