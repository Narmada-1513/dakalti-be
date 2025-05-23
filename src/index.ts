import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { createServer } from "http";
import { getEnv } from "./config/getEnv";
import { connectToMongoDB } from "./config/db";
import authRoutes from "./routes/auth";
import aiComplete from "./routes/ai-complete";

import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { checkUserAccess } from "./middlewares/checkUserAccess";

const { mongoDbUrl, port } = getEnv();
const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
// app.use(checkUserAccess());

const server = createServer(app);
app.use("/api/v1/", authRoutes);
app.use("/api/v1", authRoutes);

app.use("/api/v1/", aiComplete);

app.use(errorHandlerMiddleware);

connectToMongoDB(mongoDbUrl).then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
