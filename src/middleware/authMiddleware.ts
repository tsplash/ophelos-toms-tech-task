import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY;

const authMiddleware = (req: Request, res: any, next: NextFunction) => {
  // Skip authentication for Swagger docs
  if (req.path.startsWith("/api-docs")) {
    return next();
  }

  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export default authMiddleware;
