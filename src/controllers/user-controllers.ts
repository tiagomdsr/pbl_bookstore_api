import { Request, Response } from "express";

import UserService, { CreateUserSchema } from "../services/user-service";

// Outra forma possível de fazer
// export function createUser(request: Request, response: Response) {
//     return;
// }

class UserCrontroller {
    static async createUser(request: Request, response: Response) {
        const userToCreate = CreateUserSchema.parse(request.body);

        const createUser = await UserService.createUser(userToCreate);

        response.status(201).json({
            data: createUser,
        });
    }
}

export default UserCrontroller;