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
    const { nom, brancheId, distance } = req.body as Prisma.DirectionUncheckedCreateInput;
    if (!nom || !brancheId)
      return errorResponse(res, "'nom' and 'brancheId' are required", 400);
    if (brancheId !== req.user.brancheId)
      return errorResponse(res, "you are not authorized", 403);
    const direction = await createDirection({
      nom,
      distance,
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
    if (!direction) return errorResponse(res, "direction not found");
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
    const { nom } = req.query;
    const brancheId = req.user.brancheId;
    let query: Prisma.DirectionWhereInput = { brancheId };
    if (nom) query.nom = { contains: nom as string };
    const directions = await findMnayDirections(query);
    if (!directions) return errorResponse(res, "directio not found", 404);
    return successResponse(res, { directions });
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
    const id = req.params.id;
    const { secraitaireId } = req.body;
    if (!secraitaireId) return errorResponse(res, "secraitaireId is required", 400);
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
    const directionId = req.params.id;
    const { employerId } = req.body;
    if (!directionId || !employerId)
      return errorResponse(res, "directionId and employerId are required", 400);
    await addEmployerToDirection(employerId, directionId);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};

export const removeEmployerFromDirectionController: RequestHandler = async (req, res) => {
  try {
    const directionId = req.params.id;
    const { employerId } = req.body;
    if (!directionId || !employerId)
      return errorResponse(res, "directionId and employerId are required", 400);
    await removeEmployerFromDirection(directionId, employerId);
    return successResponse(res, {});
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error)) return errorResponse(res);
  }
};
