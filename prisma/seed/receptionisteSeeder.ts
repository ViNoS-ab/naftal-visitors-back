import { createBrancheRecepcioniste } from "../../src/repositories/BrancheRepository";

export const receptionisteSeeder = async (
  data: Parameters<typeof createBrancheRecepcioniste>
) => {
  await createBrancheRecepcioniste(...data);
};
