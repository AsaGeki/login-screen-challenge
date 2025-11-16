import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { tokenPayload } from "../models/tokenPayload.model";
import { tokenEmail } from "../models/tokenEmail.model";

dotenv.config();

export const generate = (payload: tokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" }) as string;
};

export const mailGen = (payload: tokenEmail): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" }) as string;
};

export const verify = (token: string): tokenPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  return tokenPayload.parse(decoded);
};
