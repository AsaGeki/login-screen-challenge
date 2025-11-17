import { Request, Response } from "express";
import * as vermail from "../services/emailVerify.service";

export default {
  async verifyEmail(req: Request, res: Response) {
    const token = req.params.token;
    console.log("Email verify Controller")
    console.log(token)
    const verification = await vermail.verifyToken(token);

    console.log(verification)
    if (!verification.success) {
      return res.status(400).send("Email não verificado");
    }

    return res.status(200).send("Email verificado com sucesso");
  },
};
