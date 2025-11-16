import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.util";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error("Erro inesperado:", err);

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor.",
  });
}
