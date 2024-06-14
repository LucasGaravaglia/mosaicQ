import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(`Rota chamada: ${req.method} ${req.originalUrl}`);
  if (
    req.originalUrl.includes("/list") ||
    req.originalUrl.includes("/group") ||
    req.originalUrl.includes("/user/delete")
  ) {
    verifyToken(req.headers.authorization?.split("Basic ")[1]);
  }
  next();
}
