import prisma from "../../config/prisma";
import { Prisma, Visiteur } from "@prisma/client";

export const findVisitors = (
  query: Prisma.VisiteurWhereInput = {}
): Promise<Visiteur[]> => {
  return prisma.visiteur.findMany({ where: query });
};
