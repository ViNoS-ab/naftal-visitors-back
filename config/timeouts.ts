// this file exports a Map instance containing timeouts, so that we clean them

export const timeouts = new Map<string, NodeJS.Timeout>();
