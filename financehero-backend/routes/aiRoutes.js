// routes/aiRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getAIInsights,
  getBudgetRecommendation,
  smartCategorize,
  getSavingPlan
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/", verifyToken, getAIInsights);
router.post("/budget", verifyToken, getBudgetRecommendation);
router.post("/categorize", verifyToken, smartCategorize);
router.post("/saving-plan", verifyToken, getSavingPlan);

export default router;
