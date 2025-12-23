import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import aiBudgetRoutes from "./routes/aiBudgetRoutes.js";
import aiCategoryRoutes from "./routes/aiCategoryRoutes.js";
import aiSavingPlanRoutes from "./routes/aiSavingPlanRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
console.log("DEBUG ENV:", process.env.OPENAI_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());

// 🔍 DEBUGGER (lihat request masuk)
app.use((req, res, next) => {
  console.log(`REQ: ${req.method} ${req.url}`);
  next();
});

// ======================================
// 🔧 INIT DATABASE
// ======================================
try {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      userId INTEGER,
      amount NUMBER,
      type TEXT,              -- income / expense
      description TEXT,
      date TEXT,
      goalId INTEGER          -- boleh NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY,
      userId INTEGER,
      title TEXT,
      targetAmount NUMBER,
      currentAmount NUMBER DEFAULT 0,
      deadline TEXT
    )
  `).run();

  console.log("SQLite DB ready 👍");
} catch (err) {
  console.error("SQLite init error:", err);
}

// ======================================
// MAIN ROUTE
// ======================================
app.get("/", (req, res) => {
  res.send("FinanceHero Backend Running (SQLite Mode)");
});

// ======================================
// API ROUTES
// ======================================
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai-budget", aiBudgetRoutes);
app.use("/api/ai-category", aiCategoryRoutes);
app.use("/api/ai-saving", aiSavingPlanRoutes);

// ======================================
// GLOBAL ERROR HANDLER
// ======================================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({ message: "Server error" });
});

// ======================================
// START SERVER
// ======================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
