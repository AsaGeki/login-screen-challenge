import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.util";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Erro interno do servidor.",
  });
};
