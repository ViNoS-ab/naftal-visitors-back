import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Response } from "express";
export const successResponse = (response: Response, data: object, code = 200) =>
  response.status(code).json({ success: true, ...data });

export const errorResponse = (
  response: Response,
  message: string = "there was an error processing the request",
  code = 500
) => response.status(code).json({ success: false, message });

/**
 *
 * @param {Response} response express response object
 * @param error error you catch
 * @returns {boolean} boolean represeting whether it was a validation error or not
 */
export const validationErrorResponse = (response: Response, error: any): boolean => {
  if (error instanceof PrismaClientValidationError) {
    errorResponse(response, error.message.split("\n").at(-1) || "invalid data", 400);
    return true;
  }
  return false;
};

export const prismaNotFoundResponse = (response: Response, err: any) => {
  if (err.code === "P2025") {
    errorResponse(response, "resource not found", 404);
    return true;
  }
  return false;
};
