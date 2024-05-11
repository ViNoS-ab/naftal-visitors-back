-- DropForeignKey
ALTER TABLE "Employer" DROP CONSTRAINT "Employer_directionId_fkey";

-- DropForeignKey
ALTER TABLE "Employer" DROP CONSTRAINT "Employer_userId_fkey";

-- AlterTable
ALTER TABLE "Visite" ALTER COLUMN "heureEntrerDestination" DROP NOT NULL,
ALTER COLUMN "heureSortirDestination" DROP NOT NULL,
ALTER COLUMN "heureSortir" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "Direction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
