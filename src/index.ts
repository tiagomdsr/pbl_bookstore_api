import express from "express";
import responseTime from "response-time";
import "dotenv/config";

import userRouter from "./routes/user-routes";
import categoryRouter from "./routes/category-routes";
import publisherRouter from "./routes/publisher-routes";
import healthRoutes from "./routes/health-routes";
import sessionRouter from "./routes/session-routes";
import customErrorHandler from "./errors/error-handlers";
import requestLogger from "./middlewares/request-logger";
import ensureAuthentication from "./middlewares/ensure_authentication";

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.use(responseTime());

app.use(requestLogger);
app.use(healthRoutes);
app.use(userRouter);
app.use(sessionRouter);

app.use(ensureAuthentication);
app.use(categoryRouter);
app.use(publisherRouter);

app.use(customErrorHandler);

app.listen(port, () => console.log(`server is listening at 0.0.0.0:${port}`));