import { addEmployerToDirection } from "../../src/repositories/DirectionRepository";

export const employerSeeder = async (data: Parameters<typeof addEmployerToDirection>) => {
  await addEmployerToDirection(...data);
};
