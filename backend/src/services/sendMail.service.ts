import dotenv from "dotenv";
dotenv.config();

import { createTransport } from "nodemailer";
import * as generate from "../utils/generate.util";
import { tokenEmail } from "../models/tokenEmail.model";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const mail = async (dto: tokenEmail) => {
  const token = await generate.email({
    username: dto.username,
    email: dto.email,
  });

  try {
    const info = await transporter.sendMail({
      from: `"Arthur Gabriel" <${process.env.SMTP_USER}>`,
      to: dto.email,
      subject: "Verificação de Email",
      text: `Olá! Você visitou nosso site e inseriu seu e-mail.
Por favor, clique no link abaixo para verificar.
Obrigado.`,
      html: `
        <p>Olá! Clique no botão abaixo para verificar seu e-mail:</p>
        <a href="http://localhost:5000/verify/${token}" 
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
};
