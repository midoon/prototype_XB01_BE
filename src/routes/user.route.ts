import { Router } from "express";
import { register, login, refreshToken } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/user.middleware";

const userRouter: Router = Router();

userRouter.post("/api/user/register", register);
userRouter.post("/api/user/login", login);
userRouter.post("/api/user/refresh", refreshToken);

export default userRouter;
