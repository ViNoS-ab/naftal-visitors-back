import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { updateDirection } from "./DirectionRepository";

export const BRANCH_MAIN_DIRECTION = "direction_general" as const;

const BASE_INCLUDED_FIELDS: Prisma.BrancheSelect = {
  recepcioniste: true,
  direction: {
    where: {
      nom: BRANCH_MAIN_DIRECTION,
    },
    select: {
      Directeur: {
        select: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  },
};

export const getBranches = () => {
  return prisma.branche.findMany({ include: BASE_INCLUDED_FIELDS });
};

export const createBranch = (data: Prisma.BrancheCreateInput) => {
  return prisma.branche.create({
    data: {
      ...data,
      direction: {
        create: {
          nom: BRANCH_MAIN_DIRECTION,
        },
      },
    },
    include: BASE_INCLUDED_FIELDS,
  });
};

export const getBranch = (id: string) => {
  return prisma.branche.findUnique({
    where: { id },
    include: BASE_INCLUDED_FIELDS,
  });
};

export const updateBranch = (id: string, data: Prisma.BrancheUpdateInput) => {
  return prisma.branche.update({
    where: { id },
    data,
    include: BASE_INCLUDED_FIELDS,
  });
};

export const updateBrancheDirector = (brancheId: string, userId: string) => {
  return updateDirection(
    {
      brancheId_nom: {
        brancheId,
        nom: BRANCH_MAIN_DIRECTION,
      },
    },
    {
      Directeur: {
        update: {
          user: {
            connect: { id: userId },
          },
        },
      },
    }
  );
};

export const findBranche = async (
  query: Prisma.BrancheWhereInput,
  args?: Prisma.BrancheFindFirstArgs
) => {
  return prisma.branche.findFirst({ where: query, ...args });
};

export const findManyBranches = async (
  query: Prisma.BrancheWhereInput,
  args?: Prisma.BrancheFindFirstArgs
) => {
  return prisma.branche.findMany({ where: query, ...args });
};

export const deleteBranch = (id: string) => {
  return prisma.branche.delete({ where: { id } });
};
