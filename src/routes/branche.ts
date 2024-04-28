import e from "express";
import { checkPermissions, isAuthenticated } from "../middlewares/autorization";
import {
  createBranchController,
  deleteBranchController,
  getBranchController,
  getBranchesController,
  updateBranchController,
  getBranchesByWilayaController,
} from "../controllers/branche";

const router = e.Router();

router.post("/", isAuthenticated, createBranchController);
router.get("/", isAuthenticated, getBranchesController);
router.get("/:id", isAuthenticated, getBranchController);
router.put("/:id", isAuthenticated, updateBranchController);
router.delete("/:id", isAuthenticated, deleteBranchController);
router.get(
  "/:id/users",
  isAuthenticated,
  checkPermissions("directeur", "recepcioniste"),
  getBranchController
);
router.get(
  "/wilayas/:wilaya",
  isAuthenticated,
  checkPermissions("directeur", "recepcioniste"),
  getBranchesByWilayaController
);

export default router;
