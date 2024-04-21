/*
  Warnings:

  - You are about to drop the `Directeur_branche` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[directeurId]` on the table `Branche` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `directeurId` to the `Branche` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Directeur_branche" DROP CONSTRAINT "Directeur_branche_bracheId_fkey";

-- DropForeignKey
ALTER TABLE "Directeur_branche" DROP CONSTRAINT "Directeur_branche_userId_fkey";

-- DropForeignKey
ALTER TABLE "Direction" DROP CONSTRAINT "Direction_brancheId_fkey";

-- AlterTable
ALTER TABLE "Branche" ADD COLUMN     "directeurId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Directeur_branche";

-- CreateIndex
CREATE UNIQUE INDEX "Branche_directeurId_key" ON "Branche"("directeurId");

-- AddForeignKey
ALTER TABLE "Direction" ADD CONSTRAINT "Direction_brancheId_fkey" FOREIGN KEY ("brancheId") REFERENCES "Branche"("id") ON DELETE CASCADE ON UPDATE CASCADE;
