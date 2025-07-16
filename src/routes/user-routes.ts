import { Router } from "express";

import UserCrontroller from "../controllers/user-controllers";

const userRouter = Router();

userRouter.post("/api/user", UserCrontroller.createUser);

export default userRouter;