/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Direction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Direction_nom_key" ON "Direction"("nom");
