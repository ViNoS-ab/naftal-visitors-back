import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import {
  createBranch,
  createBrancheRecepcioniste,
  deleteBranch,
  findBranche,
  findManyBranches,
  getBranch,
  getBranches,
  updateBranch,
  updateBrancheDirector,
  updateBrancheRecepcioniste,
} from "../repositories/BrancheRepository";
import {
  errorResponse,
  prismaKnownErrorResponse,
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
    if (!validationErrorResponse(res, error) && !prismaKnownErrorResponse(res, error))
      return errorResponse(res);
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
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const getBranchesByWilayaController: RequestHandler = async (req, res) => {
  try {
    const wilaya = req.params.wilaya;
    if (!wilaya) return errorResponse(res, "wilaya is required", 400);
    const branches = await findManyBranches({ wilaya: {contains: wilaya} });
    if (!branches.length) return errorResponse(res, "branches not found", 404);
    return successResponse(res, { branches }, 200);
  } catch (error) {
    return errorResponse(res, "there was an error processing the request");
  }
};

export const updateBranchDirectorController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const { directorId } = req.body;
    if (!directorId) return errorResponse(res, "directorId is required", 400);
    const branche = await updateBrancheDirector(id, directorId);
    return successResponse(res, { directeur: branche[1] }, 200);
  } catch (error) {
    if (!validationErrorResponse(res, error)) return errorResponse(res);
  }
};

export const addBrancheRecepcionisteController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const { recepcionisteId } = req.body;
    if (!recepcionisteId) return errorResponse(res, "recepcionisteId is required", 400);
    const recepcioniste = await createBrancheRecepcioniste(id, recepcionisteId);
    return successResponse(res, { recepcioniste }, 200);
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res);
  }
};