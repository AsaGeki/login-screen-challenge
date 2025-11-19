import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.util";
import * as validate from "../utils/validate.util";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}


export default async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Token não fornecido", 401));
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return next(new AppError("Token mal formado", 401));
  }

  const token = parts[1];

  try {
    const decoded = await validate.user(token);
    if (!decoded || !decoded.id) {
      return next(new AppError("Token inválido", 401));
    }
    req.userId = decoded.id;
    return next();
  } catch (err: any) {
    return next(new AppError("Token inválido ou expirado", 401));
  }
}
