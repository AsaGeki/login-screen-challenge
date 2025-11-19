import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async index(req: Request, res: Response) {
    const list = await prisma.users.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(list);
  },
};
