import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import {
  createBranch,
  deleteBranch,
  findBranche,
  findManyBranches,
  getBranch,
  getBranches,
  updateBranch,
} from "../repositories/BrancheRepository";
import {
  errorResponse,
  prismaNotFoundResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/responses";

export const createBranchController: RequestHandler = async (req, res) => {
  try {
    const { nom, adresse, wilaya } = req.body as Prisma.BrancheCreateInput;
    if (!nom || !adresse || !wilaya)
      return errorResponse(res, "nom, adresse, wilaya are required", 400);
    const branche = await createBranch({ nom, adresse, wilaya });
    return successResponse(res, { branche }, 201);
  } catch (error) {
    if (!validationErrorResponse(res, error)) return errorResponse(res);
  }
};

export const getBranchesController: RequestHandler = async (req, res) => {
  try {
    const branches = await getBranches();
    if (!branches.length) return errorResponse(res, "branches not found", 404);
    return successResponse(res, { branches }, 200);
  } catch (error) {
    return errorResponse(res, "there was an error processing the request");
  }
};

export const getBranchController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const branche = await getBranch(id);
    if (!branche) return errorResponse(res, "branche not found", 404);

    return successResponse(res, { branche }, 200);
  } catch (error) {
    return errorResponse(res, "there was an error processing the request");
  }
};

export const updateBranchController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const { nom, adresse, wilaya } = req.body as Prisma.BrancheUpdateInput;
    const branche = await updateBranch(id, { nom, adresse, wilaya });
    return successResponse(res, { branche }, 200);
  } catch (error) {
    if (!validationErrorResponse(res, error)) return errorResponse(res);
  }
};

export const deleteBranchController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const branche = await deleteBranch(id);
    return successResponse(res, { branche }, 200);
  } catch (error) {
    if (!prismaNotFoundResponse(res, error)) return errorResponse(res);
  }
};

export const getBranchesByWilayaController: RequestHandler = async (req, res) => {
  try {
    const wilaya = req.params.wilaya;
    if (!wilaya) return errorResponse(res, "wilaya is required", 400);
    const branches = await findManyBranches({ wilaya });
    if (!branches.length) return errorResponse(res, "branches not found", 404);
    return successResponse(res, { branches }, 200);
  } catch (error) {
    return errorResponse(res, "there was an error processing the request");
  }
};
