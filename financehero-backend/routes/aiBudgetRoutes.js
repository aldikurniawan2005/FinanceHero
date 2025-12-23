import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAIBudget } from "../controllers/aiBudgetController.js";

const router = express.Router();
router.post("/", verifyToken, getAIBudget);
export default router;
