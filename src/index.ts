import express, { NextFunction, Request, Response } from "express";
import * as zod from "zod";
import "dotenv/config"

import userRouter from "./routes/user-routes";
import categoryRouter from "./routes/category-routes";
import publisherRouter from "./routes/publisher-routes";
import healthRoutes from "./routes/health-routes";
import { BusinessError } from "./errors";

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use((request, response, next) => {

    console.log(`${request.method} | ${request.path}`);

    response.setHeader("X-Current-Date", new Date().toISOString());

    next();

});

app.use(userRouter);
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