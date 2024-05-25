import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

export const addVisit = (data: Prisma.VisiteCreateInput) => {
  return prisma.visite.create({
    data,
    include: {
      visiteur: true,
      utilisateur: true,
    },
  });
};

export const updateVisit = (id: string, data: Prisma.VisiteUpdateInput) => {
    return prisma.visite.update({
      where: { id },
      data,
      include: {
        direction: true,
        receptioniste: true,
        utilisateur: true,
        visiteur: true,
      },
    });
}


export const getVisit = (id: string) => {
  return prisma.visite.findUnique({
    where: { id },
    include: {
      direction: true,
      receptioniste: true,
      utilisateur: true,
      visiteur: true,
    },
  });
};

export const findVisits = (where: Prisma.VisiteWhereInput) => {
  return prisma.visite.findMany({
    where,
    include: {
      visiteur: true,
      utilisateur: true,
    },
  });
};