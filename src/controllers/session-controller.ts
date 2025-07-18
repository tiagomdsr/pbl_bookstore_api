import { Request, Response } from "express";

import SessionService from "../services/session-service";

class SessionCrontroller {
    static async createSession(request: Request, response: Response) {
        const SessionToCreate = request.body;

        const createSession = await SessionService.createSession(SessionToCreate);

        response.status(201).json({
            data: createSession,
        });
    }
}

export default SessionCrontroller;