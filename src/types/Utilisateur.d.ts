import {
  Utilisateur as User,
  Branche,
  Employer,
  Directeur,
  Direction,
  Secretaire,
  Recepcioniste,
  Directeur_branche,
} from "@prisma/client";

export type Utilisateur = User & {
  directeur?: Directeur;
  Directeur_branche?: Directeur_branche;
  employer?: Employer;
  recepcioniste?: Recepcioniste;
  secretaire?: Secretaire;
};

export type UserRole = "directeur" | "secretaire" | "employer" | "recepcioniste";
