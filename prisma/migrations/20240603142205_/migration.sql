/*
  Warnings:

  - Added the required column `distance` to the `Direction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Direction" ADD COLUMN     "distance" DOUBLE PRECISION NOT NULL;
