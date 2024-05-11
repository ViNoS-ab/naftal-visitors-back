/*
  Warnings:

  - Changed the type of `typePiece` on the `Visiteur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypePiece" AS ENUM ('passport', 'carteID', 'permisConduite');

-- AlterTable
ALTER TABLE "Visiteur" DROP COLUMN "typePiece",
ADD COLUMN     "typePiece" "TypePiece" NOT NULL;
