/*
  Warnings:

  - Added the required column `typeVisite` to the `Visite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "typeVisite" AS ENUM ('personal', 'entreprise');

-- AlterTable
ALTER TABLE "Visite" ADD COLUMN     "typeVisite" "typeVisite" NOT NULL;
