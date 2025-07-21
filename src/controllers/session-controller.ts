import { Request, Response } from "express";

import SessionService from "../services/session-service";

class SessionController {
    static async createSession(request: Request, response: Response) {
        const token = await SessionService.createSession(request.body);

        response.status(201).json({
            data: {
                token,
            },
        });
    }
}

export default SessionController;