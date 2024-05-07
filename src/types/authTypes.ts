import { UserRole } from "./Utilisateur";

export interface tokenPayload {
  brancheId: string;
  id: string;
  roles: UserRole[];
}
