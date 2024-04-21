/*
  Warnings:

  - A unique constraint covering the columns `[brancheId,nom]` on the table `Direction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Direction_nom_brancheId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Direction_brancheId_nom_key" ON "Direction"("brancheId", "nom");
