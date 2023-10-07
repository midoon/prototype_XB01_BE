import { Router } from "express";
import { register, login } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/api/user/register", register);
userRouter.post("/api/user/login", login);

export default userRouter;
