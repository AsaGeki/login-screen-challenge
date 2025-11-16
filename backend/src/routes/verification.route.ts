import { Router } from "express";

const router = Router();

router.get("/verification/:token", verificationController.verifyToken);

module.exports = router;
