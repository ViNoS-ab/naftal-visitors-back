import express from "express";
import authRoutes from "./auth";
import userRoutes from "./users";
import brancheRoutes from "./branche";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/branches", brancheRoutes);

export default router;
