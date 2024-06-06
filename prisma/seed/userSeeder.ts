import { Prisma } from "@prisma/client";
import { createUser } from "../../src/repositories/UserRepository";
import { hashSync } from "bcrypt";

const sampleUserData: Prisma.UtilisateurCreateInput[] = [
  {
    firstName: "director",
    lastName: "Doe",
    email: "director@example.com",
    password: hashSync("password123", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "secreetaire",
    lastName: "Smith",
    email: "secretaire@example.com",
    password: hashSync("password456", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "empoloyer",
    lastName: "Doe",
    email: "employer@example.com",
    password: hashSync("password123", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "recepcioniste",
    lastName: "Smith",
    email: "recepcioniste@example.com",
    password: hashSync("password456", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "director",
    lastName: "Doe",
    email: "director2@example.com",
    password: hashSync("password123", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "secreetaire",
    lastName: "Smith",
    email: "secretaire2@example.com",
    password: hashSync("password456", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "empoloyer",
    lastName: "Doe",
    email: "employer2@example.com",
    password: hashSync("password123", 10),
    branche: { connect: { id: "1" } },
  },
  {
    firstName: "recepcioniste",
    lastName: "Smith",
    email: "recepcioniste2@example.com",
    password: hashSync("password456", 10),
    branche: { connect: { id: "1" } },
  },

];

export async function* userSeeder(branch: string) {
  try {
    for (const userData of sampleUserData) {
      const user = await createUser({
        ...userData,
        branche: { connect: { id: branch } },
      });
      console.log(`Created user ${user.firstName} ${user.lastName}`);
      yield user.id;
    }
    console.log("User seeding completed successfully.");
  } catch (error) {
    console.error("Error during user seeding:", error);
  }
}
