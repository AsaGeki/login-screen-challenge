// user.controller.ts
import { userRegister } from "../models/userRegister.model";
import { userLogin } from "../models/userLogin.model";
import { Request, Response } from "express";
import * as auth from "../services/auth.service";
import { issue } from "zod/v4/core/util.cjs";

export default {
  async register(req: Request, res: Response) {
    const parsed = userRegister.safeParse(req.body);

    if (!parsed.success) {
      const formatted = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({ errors: formatted });
    }

    const data = parsed.data;
    //console.log(data);
    try {
      const newUser = await auth.register(data);
      return res.status(201).json({
        data: "Registro feito com sucesso",
        id: newUser.user.id,
        username: newUser.user.username,
        email: newUser.user.email,
        token: newUser.token,
      });
    } catch (err) {
      return res.status(500).json({ ERRO: err });
    }
  },

  async login(req: Request, res: Response) {
    const parsed = userLogin.safeParse(req.body);

    if (!parsed.success) {
      const formatted = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({ errors: formatted });
    }

    const data = parsed.data;
    console.log(data);
    try {
      const loginUser = await auth.login(data);
      return res.status(201).json({ data: "Login feito com sucesso" });
    } catch (err) {
      return res.status(500).json({ ERRO: err });
    }
  },
};
