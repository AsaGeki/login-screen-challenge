// user.controller.ts
import { userRegister } from "../models/userRegister.model";
import { userLogin } from "../models/userLogin.model";
import { Request, Response } from "express";
import * as auth from "../services/auth.service";
import { issue } from "zod/v4/core/util.cjs";

export default {
  async register(req: Request, res: Response) {
    const data = req.body;
    const newUser = await auth.register(data);
    return res.status(201).json({
      data: "Registro feito com sucesso",
      id: newUser.user.id,
      username: newUser.user.username,
      email: newUser.user.email,
      token: newUser.token,
    });
  },

  async login(req: Request, res: Response) {
    const data = req.body;
    const loginUser = await auth.login(data);
    return res.status(201).json({ data: "Login feito com sucesso" });
  },
};
