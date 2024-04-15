import { Response } from "express";
export const successResponse = (response: Response, data: any, code = 200) =>
  response.status(code).json({ success: true, ...data });

export const errorResponse = (response: Response, message: string, code = 500) =>
  response.status(code).json({ success: false, message });
