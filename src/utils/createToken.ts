import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { getUserRoles } from "../repositories/UserRepository";
import { UserRole } from "../types/Utilisateur";
import { tokenPayload } from "../types/authTypes";
import config from "../../config/default";

const EXPIRY_TIME = 16 * 60 * 60; // 16h in seconds

export const createJwtToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: EXPIRY_TIME,
  } as SignOptions);
};

export const verifyJwtToken = (token: string): tokenPayload => {
  return jwt.verify(
    token?.split("Bearer ")?.[1],
    process.env.JWT_SECRET!
  ) as tokenPayload;
};

export const addTokenToCookie = (res: Response, payload: tokenPayload) => {
  res.clearCookie("token");
  const token = createJwtToken(payload);
  res.cookie("token", "Bearer " + token, {
    httpOnly: true,
    maxAge: EXPIRY_TIME * 1000,
    secure: true,
    sameSite: config.isDev ? "lax" : "none",
  });
};
