// userRepository.ts
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import { Utilisateur, Branche, Prisma } from "@prisma/client";
export const findUserByEmail = async (email: string)  => {
  return prisma.utilisateur.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (
  id: string
): Promise<Omit<Utilisateur, "password"> | null> => {
  return prisma.utilisateur.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      Directeur_branche: true,
      directeur: true,
      employer: true,
      recepcioniste: true,
      secretaire: true,
    },
  });
};

export const createUser = async (
  data: Prisma.UtilisateurCreateInput
): Promise<Utilisateur> => {
  try {
    const hashedPw = await bcrypt.hash(data.password, 10);
    data.password = hashedPw;

    return await prisma.utilisateur.create({
      data,
    });
  } catch (error) {
    throw error;
  }
};

// export const getUserRoles = (id: string): Promise<UserRole[]> => {

// }

type UserRole = "directeur" | "secretaire" | "employer" | "recepcioniste";
