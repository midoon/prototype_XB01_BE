import { Router } from "express";
import { register } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/api/user/register", register);

export default userRouter;
