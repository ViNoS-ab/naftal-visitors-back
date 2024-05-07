import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

export const addVisit = (data: Prisma.VisiteCreateInput) => {
  return prisma.visite.create({ data });
};

export const updateVisit = (id: string, data: Prisma.VisiteUpdateInput) => {
    return prisma.visite.update({
        where: {id},
        data
    })
}

