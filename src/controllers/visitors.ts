import { RequestHandler } from "express";
import { findVisitors } from "../repositories/VisitorReposity";
import {
  errorResponse,
  prismaKnownErrorResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responses";
import { Prisma } from "@prisma/client";

const VisiteurSearchableFields: Array<Prisma.VisiteurScalarFieldEnum> = [
  "firstName",
  "lastName",
  "adresse",
  "idPiece",
] as const;
export const getVisitorsController: RequestHandler = async (req, res) => {
  try {
    const filter: Prisma.VisiteurWhereInput = {};
    Object.entries(req.query).forEach(([key, value]) => {
      const typedKey = key as (typeof VisiteurSearchableFields)[number];
      if (VisiteurSearchableFields.includes(typedKey)) {
        filter[typedKey] = {
          contains: typeof value === "string" ? value : value?.toString(),
        };
      }
    });
    const visitors = await findVisitors(filter);
    if (visitors.length === 0) return errorResponse(res, "No visitors found", 404);
    return successResponse(res, { visiteurs: visitors });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};
