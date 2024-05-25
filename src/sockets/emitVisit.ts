import { Direction, Visite } from "@prisma/client";
import { getDirectionById } from "../repositories/DirectionRepository";
import { io } from "../app";
import { findUsers } from "../repositories/UserRepository";

export const emitVisitUpdate = async (visit: Visite) => {
  try {
    const direction = await getDirectionById(visit.directionId);
    const directeurId = direction?.Directeur?.userId;
    const secretaireId = direction?.Secretaire?.userId;
    const recepcionistes = await findUsers({
      recepcioniste: { brancheId: direction?.brancheId },
    });

    const receivers = [visit.utilisateurId, ...recepcionistes.map(user => user.id)];
    if (directeurId) receivers.push(directeurId);
    if (directeurId === visit.utilisateurId && secretaireId) receivers.push(secretaireId);
    io.to(receivers).emit("visit-update", { visit });
  } catch (error) {}
};

export const emitNewVisit = async (visit: Visite) => {
  try {
    const direction = await getDirectionById(visit.directionId);
    const directeurId = direction?.Directeur?.userId;
    const secretaireId = direction?.Secretaire?.userId;

    const receivers = [visit.utilisateurId];
    if (directeurId) receivers.push(directeurId);
    if (directeurId === visit.utilisateurId && secretaireId) receivers.push(secretaireId);
    io.to(receivers).emit("new-visit", { visit });
  } catch (error) {}
};

export const emitVisitRequest = async (visit: Visite) => {
  try {
    io.to(visit.utilisateurId).emit("visit-request", { visit });
  } catch (error) {}
};
