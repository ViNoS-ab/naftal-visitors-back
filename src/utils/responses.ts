import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
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

/**
 *
 * @param {Response} response express response object
 * @param error error you catch
 * @fires errorResponse
 * @returns {boolean} boolean represeting whether it was a known error or not
 */
export const prismaKnownErrorResponse = (response: Response, err: any): boolean => {
  if (!(err instanceof PrismaClientKnownRequestError)) return false;
  switch (err.code) {
    case "P2002":
      errorResponse(
        response,
        `unique constraint failed in "${(err.meta?.target as Array<string>).join('", "')}"`,
        400
      );
      return true;
    case "P2003":
      errorResponse(
        response,
        `foreign key constraint failed in ${err.meta?.target}`,
        400
      );
      return true;
    case "P2004":
    case "P2005":
      errorResponse(response, "invalid data", 400);
      return true;
    case "P2025":
      errorResponse(response, `${err.meta?.modelName} not found`, 404);
      return true;
    default:
      return false;
  }
};
