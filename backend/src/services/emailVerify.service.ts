import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as tokenUtil from "../utils/token.util";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { email } from "zod";
import { AppError } from "../utils/appError.util";

const prisma = new PrismaClient();
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function emailSender(email: string) {
  const token = tokenUtil.mailGen({ email });

  try {
    const info = await transporter.sendMail({
      from: `"Arthur Gabriel" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verificação de Email",
      text: `Olá! Você visitou nosso site e inseriu seu e-mail.
Por favor, clique no link abaixo para verificar.
Obrigado.`,
      html: `
        <p>Olá! Clique no botão abaixo para verificar seu e-mail:</p>
        <a href="http://localhost:5000/api/verify/${token}" 
           style="
              display:inline-block;
              padding:10px 18px;
              background:#007bff;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
              font-weight:500;
            ">
          Confirmar
        </a>
      `,
    });

    console.log("Email enviado com sucesso.");
    return info;
  } catch (error) {
    console.error("Erro ao enviar Email:", error);
    throw new Error("Falha ao enviar email de verificação");
  }
}

export const verifyToken = async (token: string) => {
  try {
    const decoded = tokenUtil.verifyEmail(token) as { email: string };
    console.log("VerifyToken")
    console.log(decoded)

    if (!decoded || !decoded.email) {
      throw new AppError("Token Invalidado", 401);
    }
    const user = await prisma.user.update({
      where: { gmail: decoded.email },
      data: { status: true },
    });

    return { success: true, decoded };
  } catch (err) {
    return { success: false, error: err };
  }
};

// export const verifyToken = async (token: string) => {
//   try {
//     const decoded = await tokenUtil.verify(token);
//     const user: string = await jwt.decode(token)
//     const status = await prisma.user.update({
//       where: { user.email },
//       data: { status: true }
//     })

//     return { success: true, decoded };

//   } catch (err) {
//     return { success: false, error: err };
//   }
// };
