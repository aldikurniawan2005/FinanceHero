import { useState } from "react";
import { Button, Card, message, Spin } from "antd";
import api from "../api/api";
import "./ai.css"; // ⬅️ Tambahkan file CSS kecil untuk animasi & styling

export default function InsightsAI() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const loadInsights = async () => {
    try {
      setLoading(true);

      const trx = await api.get("/transactions");

      const res = await api.post("/ai", {
        transactions: trx.data.transactions,
      });

      setInsight(res.data.insight);
    } catch (e) {
      message.error("Gagal mengambil AI insight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        loading={loading}
        onClick={loadInsights}
        style={{
          background: "linear-gradient(135deg, #3f72ff, #7c4dff)",
          border: "none",
          padding: "10px 18px",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        {loading ? "Memproses..." : "Generate AI Insight"}
      </Button>

      {loading && (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <Spin size="large" />
          <p>AI sedang menganalisa transaksi kamu...</p>
        </div>
      )}

      {insight && (
        <Card
          className="ai-insight-card fade-in"
          style={{
            marginTop: 25,
            borderRadius: 16,
            background: "linear-gradient(135deg, #ffffff, #f7f8ff)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            padding: 20,
          }}
        >
          <h2 style={{ marginBottom: 15 }}>🔍 AI Financial Insight</h2>
          <p
            style={{
              whiteSpace: "pre-line",
              fontSize: 15,
              lineHeight: 1.7,
              color: "#333",
            }}
          >
            {insight}
          </p>
        </Card>
      )}
    </div>
  );
}
