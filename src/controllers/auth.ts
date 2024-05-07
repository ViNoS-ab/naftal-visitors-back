import { RequestHandler } from "express";
import { Utilisateur } from "@prisma/client";
import {
  createUser,
  findUserByEmail,
  getUserRoles,
} from "../repositories/UserRepository";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { addTokenToCookie } from "../utils/createToken";
import {
  errorResponse,
  prismaKnownErrorResponse,
  successResponse,
} from "../utils/responses";

export const signupController: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password, brancheId }: Utilisateur = req.body;
  if (!(email && firstName && lastName && password && brancheId))
    return errorResponse(
      res,
      "fields (email && firstName && lastName && password && brancheId) are required",
      400
    );
  try {
    const user = await createUser({
      email,
      firstName,
      lastName,
      password,
      branche: {
        connect: { id: brancheId },
      },
    });
    addTokenToCookie(res, { id: user.id, roles: [], brancheId });
    successResponse(res, { user }, 201);
  } catch (error) {
    if (error instanceof PrismaClientValidationError)
      return errorResponse(res, "Invalid data", 400);

    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return errorResponse(res, "user not found", 404);
    if (!(await user.verifyPassword(password)))
      return errorResponse(res, "invalid password", 401);

    const roles = await getUserRoles(user.id);
    addTokenToCookie(res, { id: user.id, roles, brancheId: user.brancheId });
    return successResponse(res, { ...user, password: undefined }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};
