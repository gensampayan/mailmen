import { asyncHandler } from "../middlewares/error.middleware.js";
import { signIn, signUp } from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", asyncHandler(signUp));
userRouter.post("/login", asyncHandler(signIn));

export default userRouter;
