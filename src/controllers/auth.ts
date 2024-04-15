import { RequestHandler } from "express";
import { Utilisateur } from "@prisma/client";
import { createUser, findUserByEmail } from "../repositories/UserRepository";
import {
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { addTokenToCookie } from "../utils/createToken";
import { errorResponse, successResponse } from "../utils/responses";

export const signupController: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password }: Utilisateur = req.body;
  if (!(email && firstName && lastName && password))
    return errorResponse(res, "all data is required", 400);
  try {
    const user = await createUser({
      email,
      firstName,
      lastName,
      password,
    });
    addTokenToCookie(res, user.id);
    successResponse(res, { user }, 201);
  } catch (error) {
    if (error instanceof PrismaClientValidationError)
      return errorResponse(res, "Invalid data", 400);

    if (error instanceof PrismaClientKnownRequestError)
      if (error.code === "P2002")
        return errorResponse(res, `${error.meta!.target} already exists`, 400);

    errorResponse(res, "there was an error processing the request");
  }
};

export const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return errorResponse(res, "user not found", 404);
    if (!(await user.verifyPassword(password)))
      return errorResponse(res, "invalid password", 401);

    addTokenToCookie(res, user.id);
    return successResponse(res, { ...user, password: undefined }, 200);
  } catch (error) {
    console.log("🚀 ~ constloginController:RequestHandler= ~ error:", error);
    errorResponse(res, "there was an error processing the request");
  }
};
