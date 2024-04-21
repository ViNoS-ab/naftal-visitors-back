import { RequestHandler } from "express";
import { findUserById, updateUserById } from "../repositories/UserRepository";
import { errorResponse, successResponse } from "../utils/responses";

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, email } = req.body;

    const user = await findUserById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    await updateUserById(id, { firstName, lastName, email });
    return successResponse(res, { message: "User updated successfully" }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, { user }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await findUserById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, { user }, 200);
  } catch (error) {
    errorResponse(res, "there was an error processing the request");
  }
};
