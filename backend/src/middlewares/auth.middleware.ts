import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.util";
import * as tokenUtil from "../utils/token.util";

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Token não fornecido ou mal formatado", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = tokenUtil.verify(token);
    req.userId = decoded.id;
    return next();
  } catch {
    throw new AppError("Token inválido ou expirado", 403);
  }
}
