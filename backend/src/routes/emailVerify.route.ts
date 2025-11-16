import { Router } from "express";
import emailVerificationController from "../controllers/emailVerify.controller";

const router = Router();

router.get("/:token", emailVerificationController.verifyEmail);

export default router;
