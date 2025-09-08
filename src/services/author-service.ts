import * as zod from "zod";
import { Author, PrismaClient } from "../generated/prisma";

import { BusinessError } from "../errors/errors";

export const CreateAuthorSchema = zod.object({
    name: zod.string().min(2).max(50),
    email: zod.email().max(96),
    cellphone: zod.string().regex(/^\+[0-9]+$/).max(16),
    bio: zod.string(),
});

class AuthorService {
    static async createAuthor(authorToCreate: Omit<Author, "id">): Promise<Author> {
        const prisma = new PrismaClient();

        const existingAuthor = await prisma.author.findFirst({
            where: {
                OR: [
                    {
                        email: authorToCreate.email
                    },
                    {
                        cellphone: authorToCreate.cellphone
                    }
                ]
            } 
        });

        if(!!existingAuthor) {
            throw new BusinessError("Autor(a) já existente");
        }

        const createdAuthor = await prisma.author.create({
            data: authorToCreate
        });

        return createdAuthor;
    }
}

export default AuthorService;