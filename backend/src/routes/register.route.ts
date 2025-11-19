import { Router } from "express";
import { validade } from "../middlewares/validade.middleware";
import { register } from "../models/register.model";
import registerController from "../controllers/register.controller";

const router = Router();

router.post("/register", validade(register), registerController.register);

export default router;
