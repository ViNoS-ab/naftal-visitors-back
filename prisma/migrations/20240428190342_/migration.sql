-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "brancheId" TEXT NOT NULL DEFAULT 'd37ca997-d54f-48c6-af16-77d4e914ed14';

-- AddForeignKey
ALTER TABLE "Utilisateur" ADD CONSTRAINT "Utilisateur_brancheId_fkey" FOREIGN KEY ("brancheId") REFERENCES "Branche"("id") ON DELETE CASCADE ON UPDATE CASCADE;
