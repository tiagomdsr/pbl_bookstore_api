import { Router } from "express";

import PublisherController from "../controllers/publisher-controller";

const publisherRouter = Router();

publisherRouter.post("/api/publisher", PublisherController.createPublisher);

export default publisherRouter;