import { useState } from "react";
import { Button, Card, Typography, Spin } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import api from "../api/api";
import "./ai.css";

export default function AIBudget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);

      const trx = await api.get("/transactions");
      const res = await api.post("/ai/budget", {
        transactions: trx.data.transactions,
      });

      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <Card className="ai-card"
        title={<div className="ai-title"><RobotOutlined /> AI Budget Analyzer</div>}
      >
        <Typography.Paragraph className="ai-desc">
          Hasilkan rekomendasi budget otomatis berdasarkan transaksi kamu.
        </Typography.Paragraph>

        <Button type="primary" className="ai-button" loading={loading} onClick={generate}>
          Generate Budget AI
        </Button>
      </Card>

      {data && (
        <Card className="ai-result-card" title="Hasil Rekomendasi Budget">
          <pre className="ai-pre">{JSON.stringify(data, null, 2)}</pre>
        </Card>
      )}

      {loading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Spin tip="Menghitung AI Budget..." />
        </div>
      )}
    </div>
  );
}
