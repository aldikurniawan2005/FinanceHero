import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { categorizeWithAI } from "../controllers/aiCategoryController.js";

const router = express.Router();
router.post("/", verifyToken, categorizeWithAI);
export default router;
