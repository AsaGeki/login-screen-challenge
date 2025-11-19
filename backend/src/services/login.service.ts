import { loginModel } from "../models/login.model";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError.util";
import { comparePassword } from "../utils/comparePassword.util";
import { tokenPayload } from "../models/tokenPayload.model";
import * as generate from "../utils/generate.util";

const prisma = new PrismaClient();

export const login = async (dto: loginModel) => {
  try {
    const user = await prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (!user) throw new AppError("usuario ou senha incorretos.", 401);

    const password = await comparePassword(dto.password, user.password);
    if (!password) throw new AppError("usuario ou senha incorretos.", 401);

    const payload: tokenPayload = {
      id: user.id,
      username: user.email,
    };
    const token: string = generate.user(payload);

    return { user, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
