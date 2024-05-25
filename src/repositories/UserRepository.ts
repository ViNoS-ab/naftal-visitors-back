import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { UserRole, Utilisateur } from "../types/Utilisateur";
import { findDirection } from "./DirectionRepository";
import { BRANCH_MAIN_DIRECTION } from "./BrancheRepository";

const BASE_SELECTED_FIELDS: Prisma.UtilisateurSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  brancheId: true,
};

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
      ...BASE_SELECTED_FIELDS,
      directeur: true,
      employer: true,
      recepcioniste: true,
      secretaire: true,
    },
  });
};

export const findUsers = (where: Prisma.UtilisateurWhereInput) => {
  return prisma.utilisateur.findMany({
    where,
    select: BASE_SELECTED_FIELDS,
  });
};

export const updateUserById = (id: string, data: Prisma.UtilisateurUpdateInput) => {
  return prisma.utilisateur.update({
    where: {
      id,
    },
    data,
    select: BASE_SELECTED_FIELDS,
  });
};

export const createUser = async (data: Prisma.UtilisateurCreateInput) => {
  try {
    const hashedPw = await bcrypt.hash(data.password, 10);
    data.password = hashedPw;

    return await prisma.utilisateur.create({
      data,
      select: BASE_SELECTED_FIELDS,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = (id: string) => {
  return prisma.utilisateur.delete({
    where: {
      id,
    },
  });
};


export const getUserRoles = async (
  userInp: string | Utilisateur
): Promise<UserRole[]> => {
  try {
    let user;
    if (typeof userInp === "string") user = await findUserById(userInp);
    else user = userInp;
    const userRoles: UserRole[] = [];
    if (user?.employer) userRoles.push("employer");
    if (user?.recepcioniste) userRoles.push("recepcioniste");
    if (user?.secretaire) userRoles.push("secretaire", "employer");
    if (user?.directeur) {
      userRoles.push("directeur");
      const direction = await findDirection({ Directeur: { userId: user.id } });
      if (direction?.nom === BRANCH_MAIN_DIRECTION) userRoles.push("directeur_branche");
    }

    return userRoles;
  } catch (error) {
    return [];
  }
};
