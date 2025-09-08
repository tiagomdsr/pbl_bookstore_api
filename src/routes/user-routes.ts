import { Router } from "express";

import UserController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post("/api/user", UserController.createUser);

export default userRouter;