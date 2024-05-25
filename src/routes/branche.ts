import e from "express";
import { checkPermissions } from "../middlewares/autorization";
import {
  createBranchController,
  deleteBranchController,
  getBranchController,
  getBranchesController,
  updateBranchController,
  getBranchesByWilayaController,
  updateBranchDirectorController,
  addBrancheRecepcionisteController,
} from "../controllers/branche";

const router = e.Router();

router.post("/", checkPermissions("directeur_branche"), createBranchController);
router.get("/", getBranchesController);
router.get("/:id", getBranchController);
router.put("/:id", updateBranchController);
router.delete("/:id", deleteBranchController);
router.get(
  "/wilayas/:wilaya",
  checkPermissions("directeur", "recepcioniste"),
  getBranchesByWilayaController
);
router.put(
  "/director/:id",

  checkPermissions("directeur_branche"),
  updateBranchDirectorController
);
router.post(
  "/recepcioniste/:id",

  // checkPermissions("directeur_branche"),
  addBrancheRecepcionisteController
);
export default router;
