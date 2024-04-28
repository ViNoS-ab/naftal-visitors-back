import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
const BASE_INCLUDED_FIELDS = {
  branche: true,
  Directeur: {
    select: {
      user: true,
    },
  },
  Secretaire: {
    select: {
      user: true,
    },
  },
};

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
  direction: Prisma.DirectionUpdateInput
) => {
  return prisma.direction.update({
    where,
    data: direction,
    include: BASE_INCLUDED_FIELDS,
  });
};

export const findDirection = async (
  query: Prisma.DirectionWhereInput,
  args?: Prisma.DirectionFindFirstArgs
) => {
  return prisma.direction.findFirst({ where: query, ...args });
};
