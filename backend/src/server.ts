import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import verifyRoutes from "./routes/emailVerify.route";
import errorHandler from "./middlewares/error.middleware";
import { logger } from "./middlewares/logger.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(logger);

app.use("/user", userRoutes);
app.use("/verify", verifyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;
