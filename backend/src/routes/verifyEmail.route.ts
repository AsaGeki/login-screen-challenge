import { Router } from "express";
import verifyEmailController from "../controllers/verifyEmail.controller";

const router = Router();

router.get("/:token", verifyEmailController.verifyEmail);

export default router;
