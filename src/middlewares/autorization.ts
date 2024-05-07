import { RequestHandler } from "express";
import { errorResponse } from "../utils/responses";
import { verifyJwtToken } from "../utils/createToken";
import { UserRole } from "../types/Utilisateur";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  let token = req.cookies.token?.split("Bearer ")?.[1];
  if (!token) return errorResponse(res, "Token is missing", 401);
  try {
    const decoded = verifyJwtToken(token);
    if (!decoded) return errorResponse(res, "Token is invalid", 401);
    req.user = { id: decoded.id, roles: decoded.roles, brancheId: decoded.brancheId };
    next();
  } catch (error) {
    if (!(error instanceof Error)) return errorResponse(res, "Token is invalid", 401);
    errorResponse(res, error.message, 403);
  }
};

/**
 *
 * @requires isAuthenticated middleware to be passed before
 * @param roles roles that have permission to proceed
 * @returns {RequestHandler} middleware to check the given role
 */

export const checkPermissions =
  (...roles: UserRole[]): RequestHandler =>
  async (req, res, next) => {
    try {
      const userRoles = req.user.roles;
      let isAuthorized = false;
      for (const role of roles)
        if (userRoles.includes(role)) {
          isAuthorized = true;
          break;
        }

      if (!isAuthorized)
        return errorResponse(res, "you are not authorized to do this", 403);

      next();
    } catch (error) {
      return errorResponse(res, "there was an error, try again later");
    }
  };
