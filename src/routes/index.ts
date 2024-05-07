import express from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import brancheRoutes from "./branche";
import directionRoutes from "./direction"

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/branches", brancheRoutes);
router.use("/directions", directionRoutes);

export default router;
