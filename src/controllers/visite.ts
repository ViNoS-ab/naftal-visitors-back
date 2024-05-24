import { RequestHandler } from "express";
import {
  addVisit,
  getVisit,
  updateVisit,
  findVisits,
} from "../repositories/VisitRepository";
import { Prisma, typeVisite, TypePiece } from "@prisma/client";
import {
  successResponse,
  errorResponse,
  prismaKnownErrorResponse,
  validationErrorResponse,
} from "../utils/responses";
import { getDirectionById } from "../repositories/DirectionRepository";
import { findUserById } from "../repositories/UserRepository";

export const addVisitController: RequestHandler = async (req, res) => {
  try {
    const { directionId, userId, visitType } = req.body;
    if ((await getDirectionById(directionId))?.brancheId !== req.user.brancheId)
      return errorResponse(res, "Invalid direction", 400);

    const visiteur = req.body.visiteur as Prisma.VisiteurCreateInput;
    if (!directionId || !userId || !visiteur) {
      return errorResponse(res, "Missing directionId or userId or visiteur", 400);
    }
    if (visitType !== typeVisite.entreprise && visitType !== typeVisite.personal)
      return errorResponse(res, "invalid visit type", 400);

    const { adresse, firstName, idPiece, lastName, typePiece, nationalite } = visiteur;
    if (
      !(
        adresse &&
        firstName &&
        idPiece &&
        lastName &&
        nationalite &&
        [TypePiece.carteID, TypePiece.passport, TypePiece.permisConduite].includes(
          typePiece
        )
      ) &&
      !visiteur.id
    ) {
      if (!visiteur.id) return errorResponse(res, "Missing visiteur id", 400);
      return errorResponse(res, "Missing visiteur fields", 400);
    }

    const visite = await addVisit({
      direction: { connect: { id: directionId } },
      visiteur: visiteur.id ? { connect: { id: visiteur.id } } : { create: visiteur },
      receptioniste: { connect: { userId: req.user.id } },
      utilisateur: { connect: { id: userId } },
      typeVisite: visitType,
    });
    return successResponse(res, { visite });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};

export const endVisitController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Missing visit id", 400);
    let visit = await getVisit(id);
    if (!visit || visit.direction.brancheId !== req.user.brancheId)
      return errorResponse(res, "visit not found", 404);
    const updatedFields: Prisma.VisiteUpdateInput = { heureSortir: new Date() };
    if (visit.heureEntrerDestination && !visit.heureSortirDestination)
      updatedFields.heureSortirDestination = new Date();
    visit = await updateVisit(id, updatedFields);
    return successResponse(res, { visit });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};

export const getVisitsController: RequestHandler = async (req, res) => {
  try {
    const roles = req.user.roles;
    let query = { ...req.query } as Prisma.VisiteWhereInput;
    if (
      roles.some(
        role =>
          role === "directeur_branche" ||
          role === "recepcioniste" ||
          role === "secretaire"
      )
    ) {
      query = { ...query, direction: { brancheId: req.user.brancheId } };
    } else if (roles.includes("directeur"))
      query = { ...query, direction: { Directeur: { userId: req.user.id } } };
    else query = { ...query, utilisateurId: req.user.id };

    const visits = await findVisits(query);
    if (visits.length === 0) return errorResponse(res, "No visits found", 404);
    return successResponse(res, { visits });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};

export const enterDirectrionController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Missing visit id", 400);
    let visit = await getVisit(id);
    if (!visit) return errorResponse(res, "visit not found", 404);

    if (visit.utilisateurId !== req.user.id) {
      const user = await findUserById(req.user.id)!;
      if (user?.secretaire?.directionId !== visit.directionId)
        return errorResponse(res, "visit not found", 404);
    }
    const updatedFields: Prisma.VisiteUpdateInput = {
      heureEntrerDestination: new Date(),
    };
    visit = await updateVisit(id, updatedFields);
    return successResponse(res, { visit });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};

export const exitDirectionController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Missing visit id", 400);
    let visit = await getVisit(id);
    if (!visit) return errorResponse(res, "visit not found", 404);

    if (visit.utilisateurId !== req.user.id) {
      const user = await findUserById(req.user.id)!;
      if (user?.secretaire?.directionId !== visit.directionId)
        return errorResponse(res, "visit not found", 404);
    }

    const updatedFields: Prisma.VisiteUpdateInput = {
      heureSortirDestination: new Date(),
    };
    visit = await updateVisit(id, updatedFields);
    return successResponse(res, { visit });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};

export const enterSiteController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Missing visit id", 400);
    let visit = await getVisit(id);
    if (!visit) return errorResponse(res, "visit not found", 404);

    const updatedFields: Prisma.VisiteUpdateInput = {
      heureEntrer: new Date(),
    };
    visit = await updateVisit(id, updatedFields);
    return successResponse(res, { visit });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};

export const updateVisitStatusController: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!id) return errorResponse(res, "Missing visit id", 400);
    let visit = await getVisit(id);
    if (!visit) return errorResponse(res, "visit not found", 404);

    if (visit.utilisateurId !== req.user.id)
      return errorResponse(res, "you are not allowed to update this visit", 403);
    if (!status) return errorResponse(res, "Missing status", 400);
    if (visit.status !== "PENDING")
      return errorResponse(res, "visit is already updated", 400);
    const updatedFields: Prisma.VisiteUpdateInput = {
      status,
    };
    visit = await updateVisit(id, updatedFields);
    return successResponse(res, { visit });
  } catch (error) {
    if (!prismaKnownErrorResponse(res, error) && !validationErrorResponse(res, error))
      return errorResponse(res, "Internal server error");
  }
};