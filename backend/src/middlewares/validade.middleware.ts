import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validade =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const formatted = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({ errors: formatted });
    }

    const data = parsed.data;
    next()
  };
