import "dotenv/config";
import http from "http";
import express, { type Response } from "express";
import validateEnv from "./utils/validateEnv";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";
import { Server } from "socket.io";
import { onConnection } from "./sockets/onConnection";

validateEnv();

const app = express();
const server = http.createServer(app);

const corsOptions: cors.CorsOptions = {
  origin: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors(corsOptions));
export const io = new Server(server, { cors: corsOptions });

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.get("/api/healthchecker", async (_, res: Response) => {
  // this route is just to check if the server is up and running, made for envirements where there is a health checker.

  res.status(200).json({
    success: true,
    message: "UP",
  });
});

io.on("connection", onConnection);
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`🚀 Server us running on port: ${port}`);
});
