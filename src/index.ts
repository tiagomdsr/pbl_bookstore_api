import express, { NextFunction, Request, Response } from "express";
import responseTime from "response-time";
import * as zod from "zod";
import "dotenv/config"

import userRouter from "./routes/user-routes";
import categoryRouter from "./routes/category-routes";
import publisherRouter from "./routes/publisher-routes";
import healthRoutes from "./routes/health-routes";
import { AuthenticationError, BusinessError } from "./errors";
import SessionRouter from "./routes/session-routes";

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use(responseTime());

app.use((request, response, next) => {

    console.log(`${request.method} | ${request.path}`);

    //Posso usar response.setHearder para setar headers
    //response.setHeader(nome_do_header, conteúdo_do_header)

    next();

});

app.use(userRouter);
app.use(SessionRouter);
app.use(categoryRouter);
app.use(publisherRouter);
app.use(healthRoutes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
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
});

app.listen(port, () => console.log(`server is listening at 0.0.0.0:${port}`));