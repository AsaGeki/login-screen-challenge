import { Router } from 'express';
import userController  from "../controllers/user.controller"
import { validade } from '../middlewares/validade.middleware';
import { userRegister } from '../models/userRegister.model';
import { userLogin } from '../models/userLogin.model';

const router = Router()

router.post("/register",validade(userRegister), userController.register)
router.post("/login",validade(userLogin), userController.login)

export default router;