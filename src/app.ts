import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" with { type: "json" };
import authMiddleware from "./middleware/authMiddleware.ts";
import customerController from "./controllers/customerController.ts";
import statementController from "./controllers/statementController.ts";

const app = express();

// Middleware
app.use(express.json());
app.use(authMiddleware);

// Swagger Docs served at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use("/customers", customerController);
app.use("/statements", statementController);

export default app;
