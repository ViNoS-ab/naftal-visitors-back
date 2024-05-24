import e from "express";
import { checkPermissions } from "../middlewares/autorization";
import { getVisitorsController } from "../controllers/visitors";

const router = e.Router();

router.get("/", checkPermissions("recepcioniste", "directeur"), getVisitorsController);

export default router;
