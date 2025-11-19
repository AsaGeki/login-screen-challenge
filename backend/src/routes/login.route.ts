import { Router } from "express";
import { validade } from "../middlewares/validade.middleware";
import { login } from "../models/login.model";
import loginController from "../controllers/login.controller";

const router = Router();

router.post("/login", validade(login), loginController.login);

export default router;
