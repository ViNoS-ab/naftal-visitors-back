-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "Visite" ADD COLUMN     "status" "VisitStatus" NOT NULL DEFAULT 'PENDING';
