import { PrismaClient } from "@prisma/client";
import { updateDirectionDirector } from "../../src/repositories/DirectionRepository";

export const directeurSeeder = async (
  data: Parameters<typeof updateDirectionDirector>
) => {
  await updateDirectionDirector(...data);
};
