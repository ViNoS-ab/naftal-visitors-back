// since alerts are stored in the heap for a long time, we need to
// make sure that we only keep necessary infos only

export interface Alert {
  visitId: string;
  destinataire: string;
  direction: string;
  visitorName: string;
}
