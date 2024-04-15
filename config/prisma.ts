import { PrismaClient } from "@prisma/client";
import extension from "../src/extensions";

const prisma = new PrismaClient().$extends(extension);

export default prisma;
