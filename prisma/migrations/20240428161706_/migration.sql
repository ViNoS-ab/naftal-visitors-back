/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Branche` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Branche_nom_key" ON "Branche"("nom");
