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
import { checkPermissions } from "../middlewares/autorization";

const router = e.Router();

/***********************
 *  path: /directions  *
 ***********************/

router.get("/", getDirectionsController);
router.get("/:id", getDirectionByIdController);
router.post(
  "/",

  // checkPermissions("directeur_branche"),
  createDirectionController
);
router.put("/:id", updateDirectionController);
router.delete("/:id", deleteDirectionController);
router.put(
  "/:id/director",

  // checkPermissions("directeur", "directeur_branche"),
  changeDirectionDirectorController
);
router.put(
  "/:id/secretaire",

  // checkPermissions("directeur", "directeur_branche"),
  changeDirectionSecretaryController
);

router.post(
  "/:id/employers",

  // checkPermissions("directeur", "directeur_branche", "secretaire"),
  addEmployerToDirectionConttryroller
);
router.delete(
  "/:id/employers",

  // checkPermissions("directeur", "directeur_branche", "secretaire"),
  removeEmployerFromDirectionController
);

export default router;
