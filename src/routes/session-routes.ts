import { Router } from "express";

import SessionCrontroller from "../controllers/session-controller";

const SessionRouter = Router();

SessionRouter.post("/api/session", SessionCrontroller.createSession);

export default SessionRouter;