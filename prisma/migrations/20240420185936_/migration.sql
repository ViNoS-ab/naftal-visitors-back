/*
  Warnings:

  - You are about to drop the column `directeurId` on the `Branche` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Branche_directeurId_key";

-- DropIndex
DROP INDEX "Direction_nom_key";

-- AlterTable
ALTER TABLE "Branche" DROP COLUMN "directeurId";
