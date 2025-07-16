import { Router } from "express";

import CategoryController from "../controllers/category-controller";

const categoryRouter = Router();

categoryRouter.post("/api/category", CategoryController.createCategory);
categoryRouter.get("/api/category", CategoryController.listCategories);

export default categoryRouter;