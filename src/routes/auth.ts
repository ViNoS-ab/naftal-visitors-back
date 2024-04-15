import e from "express";
import { signupController, loginController } from "../controllers/auth";

const router = e.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

export default router;
