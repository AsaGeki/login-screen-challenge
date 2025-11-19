import { Request, Response } from "express";
import { register } from "../services/register.service";

export default {
  async register(req: Request, res: Response) {
    const data = await req.body;
    const newUser = await register(data);

    return res.status(201).json({
      data: `email enviado para ${newUser.tempUser.email} verificar usuário`,
      username: newUser.tempUser.username,
    });
  },
};
