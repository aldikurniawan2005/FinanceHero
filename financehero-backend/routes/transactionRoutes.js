import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", verifyToken, createTransaction);
router.get("/", verifyToken, getTransactions);
router.delete("/:id", verifyToken, deleteTransaction);

export default router;
