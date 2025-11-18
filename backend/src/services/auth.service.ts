import { encrypt } from "../utils/encrypt.util";
import { comparePassword } from "../utils/comparePassword.util";
import * as tokenUtil from "../utils/token.util";
import { userRegister } from "../models/userRegister.model";
import { userLogin } from "../models/userLogin.model";
import { PrismaClient } from "@prisma/client";
import * as vermail from "../services/emailVerify.service";
import { tokenPayload } from "../models/tokenPayload.model";
import { AppError } from "../utils/appError.util";

const prisma = new PrismaClient();

export async function register(dto: userRegister) {
  try {
    const hashed = await encrypt(dto.password);
    const mail = await vermail.emailSender(dto.gmail);

    const user = await prisma.users.create({
      data: {
        username: dto.username,
        email: dto.gmail,
        password: hashed,
      },
    });

    const payload: tokenPayload = {
      id: user.user_id,
      email: user.email,
    };
    const token: string = tokenUtil.generate(payload);

    console.log(JSON.stringify({ user, token }, null, 2));

    return {
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function login(dto: userLogin) {
  try {
    const user = await prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (!user) throw new AppError("usuario ou senha incorretos.", 401);

    const password = await comparePassword(dto.password, user.password);
    if (!password) throw new AppError("usuario ou senha incorretos.", 401);

    const payload: tokenPayload = {
      id: user.user_id,
      email: user.email,
    };
    const token: string = tokenUtil.generate(payload);

    return { user, token };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
