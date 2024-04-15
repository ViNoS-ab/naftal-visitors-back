import { RequestHandler } from "express";
import { errorResponse } from "../utils/responses";
import { verifyJwtToken } from "../utils/createToken";
import prisma from "../../config/prisma";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.cookies.token.split("Bearer ")[1];
  if (!token) return errorResponse(res, "Token is missing", 401);
  try {
    const decoded = verifyJwtToken(token);
    if (!decoded) return errorResponse(res, "Token is invalid", 401);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (!(error instanceof Error)) return errorResponse(res, "Token is invalid", 401);
    errorResponse(res, error.message, 403);
  }
};

export const checkPermissions =
  (...roles: UserRole[]): RequestHandler =>
  async (req, res, next) => {
    const userId = req.userId;
    let isAuthorized = true;
    try {
      for (const role of roles) isAuthorized = await hasPermission(userId, role);
      if (!hasPermission) isAuthorized = false;

      next();
    } catch (error) {
      return errorResponse(res, "there was an error, try again later");
    }
  };

async function hasPermission(userId: string, role: UserRole): Promise<boolean> {
  try {
    let isAuthorized = true;
    switch (role) {
      case "directeur": {
        const directeur = await prisma.directeur.findUnique({ where: { userId } });
        if (!directeur) isAuthorized = false; 
        break;
      }
      case "employer": {
        const employer = await prisma.employer.findFirst({ where: { userId } });
        if (!employer) isAuthorized = false;
        break;
      }
      case "secretaire": {
        const secretaire = await prisma.secretaire.findFirst({ where: { userId } });
        if (!secretaire) isAuthorized = false;
        break;
      }
      case "recepcioniste": {
        const recepcioniste = await prisma.recepcioniste.findFirst({ where: { userId } });
        if (!recepcioniste) isAuthorized = false;
        break;
      }

      default:
        isAuthorized = true;
    }
    return isAuthorized; // we could've returned the value directly from the switch, but for typescript reasons and to avoid both configuring it, and to avoid un clean workrounds we added that variable 
  } catch (error) {
    throw error;
  }
}

type UserRole = "directeur" | "secretaire" | "employer" | "recepcioniste";
