import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createGoal,
  getGoals,
  deleteGoal,
} from "../controllers/goalController.js";

const router = express.Router();

router.post("/", verifyToken, createGoal);
router.get("/", verifyToken, getGoals);
router.delete("/:id", verifyToken, deleteGoal);

export default router;
