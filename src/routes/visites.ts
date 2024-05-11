import e from "express";
import { checkPermissions, isAuthenticated } from "../middlewares/autorization";
import { addVisitController, endVisitController, getVisitsController , enterDirectrionController, exitDirectionController} from "../controllers/visite";

const router = e.Router();

router.get("/", isAuthenticated, getVisitsController)
router.post("/", isAuthenticated, checkPermissions("recepcioniste"), addVisitController);
router.post("/end/:id", isAuthenticated, checkPermissions("recepcioniste"), endVisitController);
router.post("/enter/:id", isAuthenticated, checkPermissions("employer", "secretaire"), enterDirectrionController);
router.post("/exit/:id", isAuthenticated, checkPermissions("employer" , "secretaire"), exitDirectionController);

export default router;
