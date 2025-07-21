import { NextFunction, Request, Response } from "express";
import zod from "zod";
import { BusinessError, AuthenticationError } from "./errors";

function customErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof BusinessError) {
        response.status(400).json({
            error: error.message
        });

        return;
    }

    if (error instanceof AuthenticationError) {
        response.status(401).json({
            error: error.message
        });

        return;
    }

    if (error instanceof zod.ZodError) {
        response.status(400).json({
            error: "VALIDATION_ERROR",
            data: error.issues
        });

        return;
    }

    response.status(500).json({
        data: "Internal server error",
    });

    console.error(error);

};

export default customErrorHandler;