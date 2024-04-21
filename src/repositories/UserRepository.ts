import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { UserRole, Utilisateur } from "../types/Utilisateur";
export const findUserByEmail = async (email: string) => {
  return prisma.utilisateur.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = (id: string) => {
  return prisma.utilisateur.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      directeur: true,
      employer: true,
      recepcioniste: true,
      secretaire: true,
    },
  });
};

export const updateUserById = (id: string, data: Prisma.UtilisateurUpdateInput) => {
  return prisma.utilisateur.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
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

export const getUserRoles = async (
  userInp: string | Utilisateur
): Promise<UserRole[]> => {
  try {
    let user;
    if (typeof userInp === "string") user = await findUserById(userInp);
    else user = userInp;
    const userRoles: UserRole[] = [];
    if (user?.directeur) userRoles.push("directeur");
    if (user?.employer) userRoles.push("employer");
    if (user?.recepcioniste) userRoles.push("recepcioniste");
    if (user?.secretaire) userRoles.push("secretaire");

    return userRoles;
  } catch (error) {
    return [];
  }
};
