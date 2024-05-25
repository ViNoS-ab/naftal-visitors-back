/*
  Warnings:

  - Added the required column `visitTime` to the `Visite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationalite` to the `Visiteur` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Visite_receptionisteId_key";

-- AlterTable
ALTER TABLE "Visite" ADD COLUMN     "visitTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "heureEntrer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visiteur" ADD COLUMN     "nationalite" TEXT NOT NULL;
