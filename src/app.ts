import "dotenv/config";
import express, { type Response } from "express";
import validateEnv from "./utils/validateEnv";
import { PrismaClient } from "@prisma/client";

validateEnv();

const prisma = new PrismaClient();
const app = express();

async function bootstrap() {
  // Testing
  app.get("/api/healthchecker", async (_, res: Response) => {
    res.status(200).json({
      success: true,
      message: "UP",
    });
  });

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch(err => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
