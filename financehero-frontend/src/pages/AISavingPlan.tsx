import { useState } from "react";
import { Input, Button, Card, Typography, Spin } from "antd";
import api from "../api/api";
import "./ai.css";

export default function AISavingPlan() {
  const [income, setIncome] = useState("");
  const [goals, setGoals] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const res = await api.post("/ai/saving-plan", {
        income,
        goals: goals.split(","),
      });

      setPlan(res.data.plan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <Card className="ai-card">
        <Typography.Title level={4} className="ai-title">
          💰 AI Saving Plan
        </Typography.Title>

        <p className="ai-desc">AI akan membuat rencana menabung berdasarkan income & goals kamu.</p>

        <Input
          placeholder="Income per bulan"
          className="ai-input"
          type="number"
          onChange={(e) => setIncome(e.target.value)}
        />

        <Input
          placeholder="Goals (pisahkan dengan koma)"
          className="ai-input"
          style={{ marginTop: 10 }}
          onChange={(e) => setGoals(e.target.value)}
        />

        <Button type="primary" className="ai-button" loading={loading} onClick={generate}>
          Generate Saving Plan
        </Button>
      </Card>

      {plan && (
        <Card className="ai-result-card">
          <Typography.Title level={5}>Hasil AI Saving Plan</Typography.Title>
          <pre className="ai-pre">{plan}</pre>
        </Card>
      )}
    </div>
  );
}
