import { Prisma } from "@prisma/client";
import { createBranch } from "../../src/repositories/BrancheRepository";

const sampleBranchData: Prisma.BrancheCreateInput[] = [
  {
    nom: "Branch 1",
    adresse: "123 Main St, Anytown",
    wilaya: "Wilaya 1",
  },
  {
    nom: "Branch 2",
    adresse: "456 Oak Road, Otherville",
    wilaya: "Wilaya 2",
  },
  // Add more sample data as needed
];
export async function* branchSeeder() {
  try {
    for (const branchData of sampleBranchData) {
      const branch = await createBranch(branchData, 15);
      console.log("Created branch:", branch.nom);
      yield branch.id;
    }
    console.log("Branch seeding completed successfully.");
  } catch (error) {
    console.error("Error during branch seeding:", error);
  }
}
