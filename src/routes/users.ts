import e from "express";
import { getProfile, getUser, updateUser } from "../controllers/user";
import { checkPermissions, isAuthenticated } from "../middlewares/autorization";

const router = e.Router();

router.get("/profile", isAuthenticated, getProfile);
router.get(
  "/:id",
  isAuthenticated,
  checkPermissions("recepcioniste", "directeur"),
  getUser
);
router.put("/:id", isAuthenticated, updateUser);

export default router;
