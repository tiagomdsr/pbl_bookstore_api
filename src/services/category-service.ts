import * as zod from "zod";

import { PrismaClient, Category  } from "../generated/prisma";

import { BusinessError } from "../errors";

export const CreateCategorySchema = zod.object({
    name: zod.string().min(3).max(24)
});

class CategoryService {
    static async createCategory(catergoryToCreate: Omit<Category, "id">): Promise<Category> {
        const prisma = new PrismaClient();

        const existingCategory = await prisma.category.findFirst({
            where: {
                name: {
                    equals: catergoryToCreate.name,
                    mode: "insensitive"
                }
            }
        });

        if(existingCategory) {
            throw new BusinessError("Categoria já existente");
        }

        const createdCategory = await prisma.category.create({
            data: catergoryToCreate
        });

        return createdCategory;
    }

    static async listAllCategories() {
        const prisma = new PrismaClient();

        const allCategories = await prisma.category.findMany();

        return allCategories;
    }
}

export default CategoryService;