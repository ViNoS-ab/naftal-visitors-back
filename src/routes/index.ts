import express from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import brancheRoutes from "./branche";
import directionRoutes from "./direction"
import visteRoutes from "./visites";
import visitorsRouter from "./visitors";
import { isAuthenticated } from "../middlewares/autorization";

const router = express.Router();
router.use("/auth", authRoutes);

router.use(isAuthenticated);
router.use("/users", userRoutes);
router.use("/branches", brancheRoutes);
router.use("/directions", directionRoutes);
router.use("/visites", visteRoutes);
router.use("/visitors", visitorsRouter);

export default router;
