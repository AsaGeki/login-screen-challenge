import dotenv from "dotenv";
dotenv.config();

import { tokenEmail } from "../models/tokenEmail.model";
import { tokenPayload } from "../models/tokenPayload.model";
import { sign } from "jsonwebtoken";

export const user = (payload: tokenPayload): string => {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" }) as string;
};

export const email = (payload: tokenEmail): string => {
  return sign(payload, process.env.JWT_SECRET!, {expiresIn: "5min",}) as string;
};
