import { PrismaClient } from "@prisma/client";
import * as validade from "../utils/validate.util";
import { AppError } from "../utils/appError.util";
import { email } from "zod";

const prisma = new PrismaClient();

export const verifyEmail = async (token: string) => {
  try {
    const decoded = validade.email(token);
    console.log(decoded);

    if (!decoded || !decoded.email || !decoded.username) {
      const deletes = await prisma.temporary_user.delete({
        where: {
          email: decoded.email,
        },
      });
      throw new AppError("Token Invalidado", 401);
    }
    const tempUser = await prisma.temporary_user.findUnique({
      where: {
        email: decoded.email,
      },
    });

    if (!tempUser) {
      throw new AppError("Usuário temporário não encontrado", 400);
    }

    const user = await prisma.users.create({
      data: {
        username: tempUser.username,
        email: tempUser.email,
        password: tempUser.password,
      },
    });

    const deletes = await prisma.temporary_user.delete({
      where: {
        email: decoded.email,
      },
    });

    return {
      success: true,
      id: user.id,
      username: user.username,
      email: user.email,
      create: user.createdAt,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
};
