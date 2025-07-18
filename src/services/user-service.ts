import * as zod from "zod";
import bcryptjs from "bcryptjs";

import { BusinessError } from "../errors";
import { PrismaClient, User } from "../generated/prisma";

export const CreateUserSchema = zod.object({
    name: zod.string().min(3).max(24),
    surname: zod.string().min(3).max(32),
    email: zod.email({ pattern: /.@fiap\.com\.br/ }).max(96),
    password: zod.string().min(6)
});

class UserService {
    static async createUser(userToCreate: Omit<User, "id">): Promise<User> {
        const prisma = new PrismaClient();

        const existingUser = await prisma.user.findUnique({
            where: {
                email: userToCreate.email
            },
        });

        if(!!existingUser) {
            throw new BusinessError("Usuário já existente");
        }

        userToCreate.password = bcryptjs.hashSync(
            userToCreate.password,
            bcryptjs.genSaltSync()
        );

        const createdUser = await prisma.user.create({
            data: userToCreate
        });

        createdUser.password = "";

        return createdUser;
    }
}

export default UserService;