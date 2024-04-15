import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Response } from "express";

const EXPIRY_TIME = 16 * 60 * 60; // 16h in seconds

export const createJwtToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: EXPIRY_TIME,
  } as SignOptions);
};

export const verifyJwtToken = (token: string): JwtPayload  => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};

export const addTokenToCookie = (res: Response, id: string) => {
  res.clearCookie("token");
  const token = createJwtToken({id});
  res.cookie("token", "Bearer " + token, {
    httpOnly: true,
    maxAge: EXPIRY_TIME * 1000,
    secure: true
  });
};
