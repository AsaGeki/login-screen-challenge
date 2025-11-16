import { Router } from "express";
import verificationController from "../controllers/verification.controller";

const router = Router();

router.get("/verification/:token", verificationController.verifyEmail);

export default router;
