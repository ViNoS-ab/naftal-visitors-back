import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { updateDirection, updateDirectionDirector } from "./DirectionRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
      id: true
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

export const updateBrancheDirector = async (brancheId: string, userId: string) => {
  try {
    const branche = await getBranch(brancheId);
    if (!branche)
      throw new PrismaClientKnownRequestError("branche doesn't exist", {
        code: "P2025",
        clientVersion: "",
        meta: { modelName: "Branche" },
      });
    return updateDirectionDirector(branche.direction[0].id, userId, brancheId);
  } catch (error) {
    throw error;
  }
};

export const updateBrancheRecepcioniste = async (brancheId: string, userId: string) => {
  return prisma.recepcioniste.upsert({
    where: { userId, brancheId },
    update: { branche: { connect: { id: brancheId } } },
    create: { brancheId, userId },
  });
};

export const createBrancheRecepcioniste = async (branchId: string, userId: string) => {
  return prisma.recepcioniste.create({
    data: {
      brancheId: branchId,
      userId,
    },
  });
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
