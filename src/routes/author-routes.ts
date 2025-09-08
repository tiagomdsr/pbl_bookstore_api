import { Router } from "express";

import AuthorController from "../controllers/author-controller";

const authorRouter = Router();

authorRouter.post("/api/author", AuthorController.createAuthor);

export default authorRouter;