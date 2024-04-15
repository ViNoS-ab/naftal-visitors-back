/*
  Warnings:

  - You are about to drop the column `utilisateurId` on the `Direction` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurId` on the `Visiteur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Branche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[directeurId]` on the table `Branche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Directeur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Directeur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Directeur_branche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Directeur_branche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brancheId]` on the table `Directeur_branche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Direction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Recepcioniste` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Recepcioniste` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Secretaire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Secretaire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Visite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receptionisteId]` on the table `Visite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Visiteur` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Branche" DROP CONSTRAINT "Branche_directeurId_fkey";

-- DropForeignKey
ALTER TABLE "Directeur_branche" DROP CONSTRAINT "Directeur_branche_brancheId_fkey";

-- DropForeignKey
ALTER TABLE "Direction" DROP CONSTRAINT "Direction_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Visiteur" DROP CONSTRAINT "Visiteur_utilisateurId_fkey";

-- DropIndex
DROP INDEX "Direction_brancheId_idx";

-- AlterTable
ALTER TABLE "Direction" DROP COLUMN "utilisateurId";

-- AlterTable
ALTER TABLE "Visiteur" DROP COLUMN "utilisateurId";

-- CreateIndex
CREATE UNIQUE INDEX "Branche_id_key" ON "Branche"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Branche_directeurId_key" ON "Branche"("directeurId");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_id_key" ON "Directeur"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_userId_key" ON "Directeur"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_branche_id_key" ON "Directeur_branche"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_branche_userId_key" ON "Directeur_branche"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Directeur_branche_brancheId_key" ON "Directeur_branche"("brancheId");

-- CreateIndex
CREATE UNIQUE INDEX "Direction_id_key" ON "Direction"("id");

-- CreateIndex
CREATE INDEX "Direction_brancheId_nom_idx" ON "Direction"("brancheId", "nom");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_id_key" ON "Employer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_userId_key" ON "Employer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Recepcioniste_id_key" ON "Recepcioniste"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recepcioniste_userId_key" ON "Recepcioniste"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Secretaire_id_key" ON "Secretaire"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Secretaire_userId_key" ON "Secretaire"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_id_key" ON "Utilisateur"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Visite_id_key" ON "Visite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Visite_receptionisteId_key" ON "Visite"("receptionisteId");

-- CreateIndex
CREATE UNIQUE INDEX "Visiteur_id_key" ON "Visiteur"("id");

-- AddForeignKey
ALTER TABLE "Branche" ADD CONSTRAINT "Branche_directeurId_fkey" FOREIGN KEY ("directeurId") REFERENCES "Directeur_branche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
