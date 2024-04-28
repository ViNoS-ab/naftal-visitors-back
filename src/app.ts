import "dotenv/config";
import express, { type Response } from "express";
import validateEnv from "./utils/validateEnv";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";

validateEnv();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: true, // TODO: change it on production to real origins
    allowedHeaders: ["Content-Type"]
  })
);
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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🚀 Server us running on port: ${port}`);
});


