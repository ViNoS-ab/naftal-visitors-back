import { Visite } from "@prisma/client";
import { timeouts } from "../../config/timeouts";
import { emitVisitorAlert } from "../sockets/emitVisit";
import { getDirectionById } from "../repositories/DirectionRepository";

export const cancelAlert = (visitId: string) => {
  clearTimeout(timeouts.get(visitId));
  timeouts.delete(visitId);
};

/**
 *
 * @param visit
 * @param timeout minutes to wait befire firing the alert
 */
export const setAlert = async (visit: Visite) => {
  try {
    const direction = await getDirectionById(visit.directionId);

    timeouts.set(
      visit.id,
      setTimeout(() => emitVisitorAlert(visit), direction!.distance * 1000 * 60)
    );
  } catch {}
};
