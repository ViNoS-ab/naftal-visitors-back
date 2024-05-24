import e from "express";
import { checkPermissions } from "../middlewares/autorization";
import {
  addVisitController,
  endVisitController,
  getVisitsController,
  enterDirectrionController,
  exitDirectionController,
  enterSiteController,
  updateVisitStatusController,
} from "../controllers/visite";

const router = e.Router();

router.get("/", getVisitsController);
router.post("/", checkPermissions("recepcioniste"), addVisitController);
router.patch("/start/:id", checkPermissions("recepcioniste"), enterSiteController);
router.patch("/end/:id", checkPermissions("recepcioniste"), endVisitController);
router.patch("/enter/:id", enterDirectrionController);
router.patch("/exit/:id", exitDirectionController);

router.patch("/status/:id", updateVisitStatusController);



export default router;
