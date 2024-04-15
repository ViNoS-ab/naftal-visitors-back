import {
  Utilisateur as User,
  Branche,
  Employer,
  Directeur,
  Direction,
  Secretaire,
  Recepcioniste,
} from "@prisma/client";

export type Utilisateur = User & {branche: Branche} | {}