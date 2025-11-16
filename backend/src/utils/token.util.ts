import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generate(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export function verify<T>(token: string): T {
  return jwt.verify(token, process.env.JWT_SECRET) as T;
}
