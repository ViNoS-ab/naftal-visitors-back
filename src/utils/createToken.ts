import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { getUserRoles } from "../repositories/UserRepository";
import { UserRole } from "../types/Utilisateur";

const EXPIRY_TIME = 16 * 60 * 60; // 16h in seconds

export const createJwtToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: EXPIRY_TIME,
  } as SignOptions);
};

export const verifyJwtToken = (token: string): { id: string; roles: UserRole[] } => {
  return jwt.verify(token, process.env.JWT_SECRET!) as { id: string; roles: UserRole[] };
};

export const addTokenToCookie = async (res: Response, id: string) => {
  res.clearCookie("token");
  const roles = await getUserRoles(id);
  const token = createJwtToken({ id, roles });
  res.cookie("token", "Bearer " + token, {
    httpOnly: true,
    maxAge: EXPIRY_TIME * 1000,
    secure: true,
  });
};
