import e from "express";
import { getBranchUsers, getProfile, getUser, updateUser } from "../controllers/user";
import { checkPermissions, isAuthenticated } from "../middlewares/autorization";

const router = e.Router();

router.get("/profile", isAuthenticated, getProfile);
router.get(
  "/:id",
  isAuthenticated,
  checkPermissions("recepcioniste", "directeur", "directeur_branche", "secretaire"),
  getUser
);
router.get(
  "/",
  isAuthenticated,
  checkPermissions("recepcioniste", "directeur", "directeur_branche", "secretaire"),
  getBranchUsers
);
router.put("/:id", isAuthenticated, updateUser);

export default router;
