import { RequestHandler } from "express";
import { findUserById, findUsers, updateUserById } from "../repositories/UserRepository";
import { errorResponse, successResponse } from "../utils/responses";
import { Prisma } from "@prisma/client";

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, email } = req.body;

    const user = await findUserById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    await updateUserById(id, { firstName, lastName, email });
    return successResponse(res, { message: "User updated successfully" }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return errorResponse(res, "User id is required", 400);

    const user = await findUserById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, { user }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await findUserById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, { user }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};

const UtilisateurSearchableFields: Array<Prisma.UtilisateurScalarFieldEnum> = [
  "firstName",
  "lastName",
  "email",
] as const;
export const getBranchUsers: RequestHandler = async (req, res) => {
  try {
    const filter: Prisma.UtilisateurWhereInput = {};
    Object.entries(req.query).forEach(([key, value]) => {
      const typedKey = key as (typeof UtilisateurSearchableFields)[number];
      if (UtilisateurSearchableFields.includes(typedKey)) {
        filter[typedKey] = {
          contains: typeof value === "string" ? value : value?.toString(),
        };
      }
    });
    if (typeof req.query.directionId === "string") {
      const dirFilter = { directionId: req.query.directionId };
      filter.OR = [
        { employer: dirFilter },
        { directeur: dirFilter },
        { secretaire: dirFilter },
      ];
    }
    const users = await findUsers({
      brancheId: req.user.brancheId,
      ...filter,
    });
    if (!users.length) return errorResponse(res, "no users found", 404);

    return successResponse(res, { users }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};
