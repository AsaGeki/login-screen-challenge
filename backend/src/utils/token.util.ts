import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generate = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
