import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const verifyPassword = {
  needs: { password: true },
  compute(user: Prisma.UtilisateurUncheckedCreateInput) {
    return (password: string): Promise<boolean> => {
      return bcrypt.compare(password, user.password);
    };
  },
};

const utilisateur = {
  verifyPassword,
};
export default utilisateur;
