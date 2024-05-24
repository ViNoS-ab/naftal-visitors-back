import e from "express";
import { getBranchUsers, getProfile, getUser, updateUser } from "../controllers/user";
import { checkPermissions } from "../middlewares/autorization";

const router = e.Router();

router.get("/profile", getProfile);
router.get(
  "/:id",

  checkPermissions("recepcioniste", "directeur", "directeur_branche", "secretaire"),
  getUser
);
router.get(
  "/",

  checkPermissions("recepcioniste", "directeur", "directeur_branche", "secretaire"),
  getBranchUsers
);
router.put("/:id", updateUser);

export default router;
