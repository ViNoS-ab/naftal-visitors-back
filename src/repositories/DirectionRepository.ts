import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { updateUserById } from "./UserRepository";

const BASE_USER_INCLUDE_FIELDS: Prisma.UtilisateurSelect = {
  email: true,
  id: true,
  firstName: true,
  lastName: true,
} as const;
const BASE_INCLUDED_FIELDS: Prisma.DirectionInclude = {
  Directeur: {
    select: {
      userId: true,
      user: {
        select: BASE_USER_INCLUDE_FIELDS,
      },
    },
  },
  Secretaire: {
    select: {
      userId: true,
      user: {
        select: BASE_USER_INCLUDE_FIELDS,
      },
    },
  },
} as const;

export const getDirectionById = (id: string) => {
  return prisma.direction.findUnique({
    where: { id },
    include: BASE_INCLUDED_FIELDS,
  });
};

export const createDirection = (direction: Prisma.DirectionCreateInput) => {
  return prisma.direction.create({
    data: direction,
    include: BASE_INCLUDED_FIELDS,
  });
};

export const updateDirection = (
  where: Prisma.DirectionWhereUniqueInput,
  direction: Prisma.DirectionUncheckedUpdateInput
) => {
  return prisma.direction.update({
    where,
    data: direction,
    include: BASE_INCLUDED_FIELDS,
  });
};

export const updateDirectionDirector = (
  directionId: string,
  userId: string,
  branchId: string
) => {
  return prisma.$transaction([
    prisma.directeur.upsert({
      where: { directionId: directionId },
      update: { user: { connect: { id: userId } } },
      create: { directionId: directionId, userId },
    }),
    updateUserById(userId, {
      branche: {
        connect: {
          id: branchId,
        },
      },
    }),
  ]);
};

export const updateDirectionSecretary = (
  directionId: string,
  userId: string,
  branchId: string
) => {
  return prisma.$transaction([
    prisma.secretaire.upsert({
      where: { directionId: directionId },
      update: { user: { connect: { id: userId } } },
      create: { directionId: directionId, userId },
    }),
    updateUserById(userId, {
      branche: {
        connect: {
          id: branchId,
        },
      },
    }),
  ]);
};

export const addEmployerToDirection = (userId: string, directionId: string) => {
  return prisma.utilisateur.update({
    where: {
      id: userId,
    },
    data: {
      employer: {
        create: {
          directionId,
        },
      },
    },
  });
};

export const removeEmployerFromDirection = (userId: string, directionId: string) => {
  return prisma.utilisateur.update({
    where: { id: userId },
    data: { employer: { delete: { directionId } } },
  });
};

export const findDirection = (
  query: Prisma.DirectionWhereInput,
  args?: Prisma.DirectionFindFirstArgs
) => {
  return prisma.direction.findFirst({ where: query, ...args });
};

export const findMnayDirections = (
  query: Prisma.DirectionWhereInput,
  args?: Prisma.DirectionFindManyArgs
) => {
  return prisma.direction.findMany({ where: query, ...args });
};

export const deleteDirection = (id: string) => {
  return prisma.direction.delete({ where: { id } });
};
