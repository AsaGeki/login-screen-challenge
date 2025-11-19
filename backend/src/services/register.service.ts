import { PrismaClient } from "@prisma/client";
import { registerModel } from "../models/register.model";
import { encrypt } from "../utils/encrypt.util";
import { AppError } from "../utils/appError.util";
import { mail } from "./sendMail.service";

const prisma = new PrismaClient();

export const register = async (dto: registerModel) => {
  try {
    const username = await prisma.users.findUnique({
      where: { username: dto.username },
    });
    if (username) throw new AppError("usuário já existente", 409);

    const email = await prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (email) throw new AppError("email em uso", 409);

    const encrypted = await encrypt(dto.password);

    const tempUser = await prisma.temporary_user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: encrypted,
      },
    });

    const sendMail = mail({
        username: dto.username,
        email: dto.email
    })

    return {
      tempUser: {
        username: tempUser.username,
        email: tempUser.email,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
