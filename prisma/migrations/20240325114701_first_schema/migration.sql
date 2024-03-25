-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL,
    "directionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visite" (
    "id" TEXT NOT NULL,
    "visiteurId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "heureEntrer" TIMESTAMP(3) NOT NULL,
    "heureEntrerDestination" TIMESTAMP(3) NOT NULL,
    "heureSortirDestination" TIMESTAMP(3) NOT NULL,
    "heureSortir" TIMESTAMP(3) NOT NULL,
    "receptionisteId" TEXT NOT NULL,

    CONSTRAINT "Visite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directeur_branche" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brancheId" TEXT NOT NULL,

    CONSTRAINT "Directeur_branche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direction" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "brancheId" TEXT NOT NULL,
    "utilisateurId" TEXT,

    CONSTRAINT "Direction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secretaire" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "directionId" TEXT NOT NULL,

    CONSTRAINT "Secretaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branche" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "wilaya" TEXT NOT NULL,
    "directeurId" TEXT NOT NULL,

    CONSTRAINT "Branche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visiteur" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "typePiece" TEXT NOT NULL,
    "idPiece" TEXT NOT NULL,
    "entreprise" TEXT,
    "utilisateurId" TEXT NOT NULL,

    CONSTRAINT "Visiteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recepcioniste" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brancheId" TEXT NOT NULL,

    CONSTRAINT "Recepcioniste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directeur" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "directionId" TEXT NOT NULL,

    CONSTRAINT "Directeur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Direction_brancheId_idx" ON "Direction"("brancheId");

-- CreateIndex
CREATE INDEX "Utilisateur_firstName_lastName_idx" ON "Utilisateur"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Visiteur_idPiece_key" ON "Visiteur"("idPiece");

-- CreateIndex
CREATE INDEX "Visiteur_firstName_lastName_idx" ON "Visiteur"("firstName", "lastName");

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "Direction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visite" ADD CONSTRAINT "Visite_visiteurId_fkey" FOREIGN KEY ("visiteurId") REFERENCES "Visiteur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visite" ADD CONSTRAINT "Visite_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visite" ADD CONSTRAINT "Visite_receptionisteId_fkey" FOREIGN KEY ("receptionisteId") REFERENCES "Recepcioniste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directeur_branche" ADD CONSTRAINT "Directeur_branche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directeur_branche" ADD CONSTRAINT "Directeur_branche_brancheId_fkey" FOREIGN KEY ("brancheId") REFERENCES "Branche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction" ADD CONSTRAINT "Direction_brancheId_fkey" FOREIGN KEY ("brancheId") REFERENCES "Branche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction" ADD CONSTRAINT "Direction_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Secretaire" ADD CONSTRAINT "Secretaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Secretaire" ADD CONSTRAINT "Secretaire_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "Direction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branche" ADD CONSTRAINT "Branche_directeurId_fkey" FOREIGN KEY ("directeurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visiteur" ADD CONSTRAINT "Visiteur_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recepcioniste" ADD CONSTRAINT "Recepcioniste_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recepcioniste" ADD CONSTRAINT "Recepcioniste_brancheId_fkey" FOREIGN KEY ("brancheId") REFERENCES "Branche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directeur" ADD CONSTRAINT "Directeur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Directeur" ADD CONSTRAINT "Directeur_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "Direction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
