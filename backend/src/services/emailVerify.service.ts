import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as tokenUtil from "../utils/token.util";

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

export async function emailVerify(email: string) {
  const token = tokenUtil.generate({ email });

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
}
