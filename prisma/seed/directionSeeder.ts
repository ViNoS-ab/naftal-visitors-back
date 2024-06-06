import { Prisma } from "@prisma/client";
import { createDirection } from "../../src/repositories/DirectionRepository";

const sampleDirectionData: Prisma.DirectionCreateInput[] = [
  {
    nom: "Direction 1",
    branche: { connect: { id: "1" } }, // Replace with the appropriate branche
    distance: 1, // Assuming a distance of 10 minutes
  },
  {
    nom: "Direction 2",
    branche: { connect: { id: "1" } }, // Replace with the appropriate brancheId
    distance: 15, // Assuming a distance of 15 minutes
  },
  // Add more sample data as needed
];

export async function* directionSeeder(branch: string) {
  try {
    for (const directionData of sampleDirectionData) {
      const direction = await createDirection({
        ...directionData,
        branche: { connect: { id: branch } },
      });
      console.log(`Created direction ${direction.nom}`);
      yield direction.id;
    }
    console.log("Direction seeding completed successfully.");
  } catch (error) {
    console.error("Error during direction seeding:", error);
  }
}
