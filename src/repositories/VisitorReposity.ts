import prisma from "../../config/prisma";
import { Prisma, Visiteur } from "@prisma/client";

export const createVisitor = (data: Prisma.VisiteurCreateInput): Promise<Visiteur> => {
  return prisma.visiteur.create({ data });
};

export const findVisitors = (
  query: Prisma.VisiteurWhereInput = {}
): Promise<Visiteur[]> => {
  return prisma.visiteur.findMany({ where: query });
};

