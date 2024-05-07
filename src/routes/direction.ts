import e from "express";
import {
  changeDirectionDirectorController,
  changeDirectionSecretaryController,
  createDirectionController,
  deleteDirectionController,
  getDirectionByIdController,
  getDirectionsController,
  updateDirectionController,
  addEmployerToDirectionConttryroller,
  removeEmployerFromDirectionController,
} from "../controllers/direction";
import { isAuthenticated, checkPermissions } from "../middlewares/autorization";

const router = e.Router();

router.get("/", getDirectionsController);
router.get("/:id", getDirectionByIdController);
router.post(
  "/",
  isAuthenticated,
  checkPermissions("directeur_branche"),
  createDirectionController
);
router.put("/:id", isAuthenticated, updateDirectionController);
router.delete("/:id", isAuthenticated, deleteDirectionController);
router.put(
  "/:id/director",
  isAuthenticated,
  // checkPermissions("directeur", "directeur_branche"),
  changeDirectionDirectorController
);
router.put(
  "/:id/secretaire",
  isAuthenticated,
  checkPermissions("directeur", "directeur_branche"),
  changeDirectionSecretaryController
);

router.post(
  "/:id/employers",
  isAuthenticated,
  checkPermissions("directeur", "directeur_branche", "secretaire"),
  addEmployerToDirectionConttryroller
);
router.delete(
  "/:id/employers",
  isAuthenticated,
  checkPermissions("directeur", "directeur_branche", "secretaire"),
  removeEmployerFromDirectionController
);

export default router;
