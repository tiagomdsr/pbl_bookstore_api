import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/api/health", (request, response) => {
    response.json({
        data: `Healthy - ${new Date().toISOString()}`
    });

});

export default healthRoutes;