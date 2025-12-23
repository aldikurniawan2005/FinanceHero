import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getSavingPlan } from "../controllers/aiSavingPlanController.js";

const router = express.Router();
router.post("/", verifyToken, getSavingPlan);
export default router;
