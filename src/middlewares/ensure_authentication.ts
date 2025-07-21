import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { AuthenticationError } from "../errors/errors";

function ensureAuthentication(request: Request, response: Response, next: NextFunction): void {
    try {
        if (!request.headers.authorization) {
            throw new AuthenticationError();
        }

        const [_, token] = request.headers.authorization.split(" ");

        console.log("auth: ", token);

        jwt.verify(token, process.env.JWT_SECRET!);

        next();
    } catch (error) {
        console.error(`authentication error: ${(<Error>error).message}`);
        throw new AuthenticationError();
    }
}

export default ensureAuthentication;