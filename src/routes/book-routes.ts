import { Router } from "express";

import BookController from "../controllers/book-controller";

const bookRouter = Router();

bookRouter.post("/api/book", BookController.createBook);
bookRouter.get("/api/book", BookController.listBooks);
bookRouter.put("/api/book/:id", BookController.updateBook);
bookRouter.delete("/api/book/:id", BookController.deleteBook);

export default bookRouter;