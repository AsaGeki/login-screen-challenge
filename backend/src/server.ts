import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware";
import { logger } from "./middlewares/logger.middleware";

import login from "./routes/login.route"
import register from "./routes/register.route"
import verifyEmail from "./routes/verifyEmail.route"
import index from "./routes/index.route"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use(logger);

app.use("/", login);
app.use("/", register);
app.use("/verify", verifyEmail);
app.use("/", index)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;
