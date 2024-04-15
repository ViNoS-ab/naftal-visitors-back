/*
  Warnings:

  - You are about to drop the column `destinationId` on the `Visite` table. All the data in the column will be lost.
  - Added the required column `directionId` to the `Visite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utilisateurId` to the `Visite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Visite" DROP CONSTRAINT "Visite_destinationId_fkey";

-- AlterTable
ALTER TABLE "Visite" DROP COLUMN "destinationId",
ADD COLUMN     "directionId" TEXT NOT NULL,
ADD COLUMN     "utilisateurId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Visite" ADD CONSTRAINT "Visite_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "Direction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visite" ADD CONSTRAINT "Visite_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
