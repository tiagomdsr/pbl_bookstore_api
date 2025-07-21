import { Router } from "express";

import UserController from "../controllers/user-controllers";

const userRouter = Router();

userRouter.post("/api/user", UserController.createUser);

export default userRouter;