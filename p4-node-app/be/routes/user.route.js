import { signIn, signUp } from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", signUp);
userRouter.post("/login", signIn);

export default userRouter;
