import { Request, Response } from "express";
import { login } from "../services/login.service";

export default {
  async login(req: Request, res: Response) {
    const data = req.body;
    const result = await login(data);
    return res.status(200).json(result);
  },
};
