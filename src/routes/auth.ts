import e from "express";
import { signupController, loginController, logoutController } from "../controllers/auth";
import { isAuthenticated } from "../middlewares/autorization";

const router = e.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.delete("/logout", isAuthenticated, logoutController);

export default router;
