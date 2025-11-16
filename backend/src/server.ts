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

app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/api/user", userRoutes);
app.use("/api/verify", verifyRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando com TypeScript!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;
