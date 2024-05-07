import { RequestHandler } from "express";
import {
  addEmployerToDirection,
  createDirection,
  deleteDirection,
  findDirection,
  findMnayDirections,
  getDirectionById,
  removeEmployerFromDirection,
  updateDirection,
  updateDirectionDirector,
  updateDirectionSecretary,
} from "../repositories/DirectionRepository";
import {
  errorResponse,
  successResponse,
  prismaKnownErrorResponse,
  validationErrorResponse,
} from "../utils/responses";
import { Prisma } from "@prisma/client";

export const createDirectionController: RequestHandler = async (req, res) => {
  try {
    const { nom, brancheId } = req.body as Prisma.DirectionUncheckedCreateInput;
    if (!nom || !brancheId)
      return errorResponse(res, "'nom' and 'brancheId' are required", 400);
    if (brancheId !== req.user.brancheId)
      return errorResponse(res, "you are not authorized", 403);
    const direction = await createDirection({
      nom,
      branche: {
        connect: { id: brancheId },
      },
    });
    return successResponse(res, { direction });
  } catch (error) {
    if (!validationErrorResponse(res, error) && !prismaKnownErrorResponse(res, error))
      return errorResponse(res);
  }
};

export const getDirectionByIdController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const direction = await getDirectionById(id);
    if (!direction) return prismaKnownErrorResponse(res, "direction");
    return successResponse(res, { direction });
  } catch (error) {
    return errorResponse(res, "there was an error processing the request");
  }
};

export const updateDirectionController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    const { nom, brancheId } = req.body as Prisma.DirectionUncheckedUpdateInput;
    const direction = await updateDirection({ id }, { nom, brancheId });
    return successResponse(res, { direction });
  } catch (error) {
    if (!(validationErrorResponse(res, error) || prismaKnownErrorResponse(res, error)))
      return errorResponse(res);
  }
};

export const getDirectionsController: RequestHandler = async (req, res) => {
  try {
    const { nom, brancheId } = req.query;
    let query: Prisma.DirectionWhereInput = {};
    if (nom) query.nom = { contains: nom as string };
    if (brancheId) query.brancheId = brancheId as string;
    const direction = await findMnayDirections(query);
    if (!direction) return errorResponse(res, "directio not found", 404);
    return successResponse(res, { direction });
  } catch (error) {
    return errorResponse(res, "there was an error processing the request");
  }
};

export const deleteDirectionController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "id is required", 400);
    await deleteDirection(id);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const changeDirectionDirectorController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { directorId } = req.body;
    if (!id || !directorId)
      return errorResponse(res, "id and directorId are required", 400);
    const direction = await findDirection({ id });
    if (!direction) return errorResponse(res, "direction not found", 404);
    await updateDirectionDirector(id, directorId, direction.brancheId);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const changeDirectionSecretaryController: RequestHandler = async (req, res) => {
  try {
    const { id, secraitaireId } = req.body;
    if (!id || !secraitaireId)
      return errorResponse(res, "id and secraitaireId are required", 400);
    const direction = await findDirection({ id });
    if (!direction) return errorResponse(res, "direction not found", 404);
    await updateDirectionSecretary(id, secraitaireId, direction.brancheId);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const addEmployerToDirectionConttryroller: RequestHandler = async (req, res) => {
  try {
    const { directionId, employerId } = req.body;
    if (!directionId || !employerId)
      return errorResponse(res, "directionId and employerId are required", 400);
    await addEmployerToDirection(directionId, employerId);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const removeEmployerFromDirectionController: RequestHandler = async (req, res) => {
  try {
    const { directionId, employerId } = req.body;
    if (!directionId || !employerId)
      return errorResponse(res, "directionId and employerId are required", 400);
    await removeEmployerFromDirection(directionId, employerId);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};
