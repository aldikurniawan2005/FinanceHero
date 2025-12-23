import express from "express";
import { register, login, profile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔥 INI ROUTE PROFILE YANG BENER
router.get("/profile", verifyToken, profile);

export default router;
