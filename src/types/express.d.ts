import { Request } from "express";
import { UserRole } from "./Utilisateur";

declare module "express-serve-static-core" {
  export interface Request {
    user: {
      id: string;
      roles: UserRole[]
    };
  }
}
