import { Request, Response } from "express";
import { verifyEmail } from "../services/verifyEmail.service";

export default {
  async verifyEmail(req: Request, res: Response) {
    const token = req.params.token;
    const verification = await verifyEmail(token);

    if (!verification.success) {
      return res.status(400).send("Email não verificado");
    }

    return res.status(200).send("Email verificado com sucesso");
  },
};
