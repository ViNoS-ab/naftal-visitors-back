/*
  Warnings:

  - A unique constraint covering the columns `[nom,brancheId]` on the table `Direction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Direction_nom_brancheId_key" ON "Direction"("nom", "brancheId");
