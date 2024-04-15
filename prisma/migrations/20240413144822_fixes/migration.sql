/*
  Warnings:

  - You are about to drop the column `directeurId` on the `Branche` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[directionId]` on the table `Directeur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[directionId]` on the table `Secretaire` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Branche_directeurId_key";

-- AlterTable
ALTER TABLE "Branche" DROP COLUMN "directeurId";

-- CreateTable
CREATE TABLE "Directeur_branche" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bracheId" TEXT NOT NULL,

    CONSTRAINT "Directeur_branche_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_branche_id_key" ON "Directeur_branche"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_branche_userId_key" ON "Directeur_branche"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_branche_bracheId_key" ON "Directeur_branche"("bracheId");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_directionId_key" ON "Directeur"("directionId");

-- CreateIndex
CREATE UNIQUE INDEX "Secretaire_directionId_key" ON "Secretaire"("directionId");

-- AddForeignKey
ALTER TABLE "Directeur_branche" ADD CONSTRAINT "Directeur_branche_bracheId_fkey" FOREIGN KEY ("bracheId") REFERENCES "Branche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directeur_branche" ADD CONSTRAINT "Directeur_branche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
