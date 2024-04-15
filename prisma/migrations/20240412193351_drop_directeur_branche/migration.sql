/*
  Warnings:

  - You are about to drop the `Directeur_branche` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Branche" DROP CONSTRAINT "Branche_directeurId_fkey";

-- DropForeignKey
ALTER TABLE "Directeur_branche" DROP CONSTRAINT "Directeur_branche_userId_fkey";

-- DropTable
DROP TABLE "Directeur_branche";
