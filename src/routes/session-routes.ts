import { Router } from "express";

import SessionController from "../controllers/session-controller";

const sessionRouter = Router();

sessionRouter.post("/api/session", SessionController.createSession);

export default sessionRouter;