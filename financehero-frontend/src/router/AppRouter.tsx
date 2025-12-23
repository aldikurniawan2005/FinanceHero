// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Goals from "../pages/Goals";
import InsightsAI from "../pages/InsightsAI";
import StatsPage from "../pages/StatsPage";
import AIBudget from "../pages/AIBudget";
import AISmartCategorizer from "../pages/AISmartCategorizer";
import AISavingPlan from "../pages/AISavingPlan";

import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* MAIN PAGES */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/stats" element={<StatsPage />} />

      {/* AI FEATURES */}
      <Route path="/insights-ai" element={<InsightsAI />} />
      <Route path="/ai-budget" element={<AIBudget />} />
      <Route path="/ai-smart-category" element={<AISmartCategorizer />} />
      <Route path="/ai-saving" element={<AISavingPlan />} />
    </Routes>
  );
}
