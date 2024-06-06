import { Prisma, PrismaClient } from "@prisma/client";
import { updateDirectionSecretary } from "../../src/repositories/DirectionRepository";

export const secretaireSeeder = async (
  data: Parameters<typeof updateDirectionSecretary>
) => {
  await updateDirectionSecretary(...data);
};
