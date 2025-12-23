import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/statController.js";

const router = express.Router();

router.get("/", verifyToken, getStats);

export default router;
