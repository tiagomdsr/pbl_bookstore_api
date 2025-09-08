import { Request, Response } from "express";

import AuthorService, { CreateAuthorSchema } from "../services/author-service";


class AuthorController {
    static async createAuthor(request: Request, response: Response) {
        const authorToCreate = CreateAuthorSchema.parse(request.body);

        const createAuthor = await AuthorService.createAuthor(authorToCreate);

        response.status(201).json({
            data: createAuthor
        });
    }
}

export default AuthorController;