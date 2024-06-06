import { PrismaClient } from "@prisma/client";
import { branchSeeder } from "./branchSeeder";
import { directionSeeder } from "./directionSeeder";
import { userSeeder } from "./userSeeder";
import { employerSeeder } from "./employerSeeder";
import { secretaireSeeder } from "./secretaireSeeder";
import { directeurSeeder } from "./directeurSeeder";
import { receptionisteSeeder } from "./receptionisteSeeder";

const prisma = new PrismaClient();
async function main() {
  for await (const branch of branchSeeder()) {
    let userGen = userSeeder(branch);
    const recepcioniste = (await userGen!.next()).value!;
    await receptionisteSeeder([branch, recepcioniste]);
    for await (const direction of directionSeeder(branch)) {
      const director = (await userGen.next()).value!;
      await directeurSeeder([direction, director, branch]);
      const secretaire = (await userGen.next()).value!;
      await secretaireSeeder([direction, secretaire, branch]);
      const employer = (await userGen.next()).value!;
      await employerSeeder([employer, direction]);
    }
  }
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
