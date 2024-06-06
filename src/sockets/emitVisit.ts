import { Direction, Prisma, Visite } from "@prisma/client";
import { getDirectionById } from "../repositories/DirectionRepository";
import { io } from "../app";
import { findUserById, findUsers } from "../repositories/UserRepository";
import { Alert } from "../types/AlertType";
import { getBranch } from "../repositories/BrancheRepository";

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

export const emitVisitorAlert = async (visit: Visite) => {
  try {
    const { directionId, visiteurId, utilisateurId } = visit;
    const direction = await getDirectionById(directionId);
    const destinataire = await findUserById(utilisateurId);
    const visiteur = await findUserById(visiteurId);
    const alert: Alert = {
      visitId: visit.id,
      destinataire: `${destinataire?.firstName} ${destinataire?.lastName}`,
      direction: direction?.nom || "",
      visitorName: `${visiteur?.firstName} ${visiteur?.lastName}`,
    };

    const branch = await getBranch(direction!.brancheId);
    io.to(branch!.recepcioniste.map(rec => rec.userId)).emit("visitor-alert", { alert });
  } catch (error) {}
};
