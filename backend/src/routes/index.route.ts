import { Router } from "express";
import authenticate from "../middlewares/auth.middleware";
import indexController from "../controllers/index.controller";

const router = Router();

router.get("/index", authenticate,indexController.index);

export default router;
