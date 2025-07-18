import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { AuthenticationError } from "../errors";
import { PrismaClient } from "../generated/prisma";

export type CreateSessionParams = {
    email: string;
    password: string;
}

class SessionService {
    static async createSession(params: CreateSessionParams): Promise<string> {
        const prisma = new PrismaClient();

        const foundUser = await prisma.user.findUnique({
            where: {
                email: params.email
            },
        });

        if(!foundUser) {
            throw new AuthenticationError();
        }

        const passwordsMatch = bcryptjs.compareSync(
            params.password,
            foundUser.password
        );

        if(!passwordsMatch) {
            throw new AuthenticationError("Combination email/password does not match");
        }

        const token: string = jwt.sign(
            {
                sub: foundUser.id,
                user_name: foundUser.name,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "10M",
            }
        )

        return token;
    }
}

export default SessionService;