import { useState } from "react";
import { Input, Button, Card, Typography } from "antd";
import api from "../api/api";
import "./ai.css";

export default function AISmartCategory() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const generate = async () => {
    const res = await api.post("/ai/categorize", { name: text });
    setCategory(res.data.category);
  };

  return (
    <div className="ai-container">
      <Card className="ai-card">
        <Typography.Title level={4} className="ai-title">
          🔎 AI Smart Categorization
        </Typography.Title>

        <p className="ai-desc">Masukkan nama transaksi, AI akan menentukan kategorinya.</p>

        <Input
          placeholder="Contoh: Indomaret, Grab, PLN"
          className="ai-input"
          onChange={(e) => setText(e.target.value)}
        />

        <Button type="primary" className="ai-button" onClick={generate}>
          Cek Kategori
        </Button>
      </Card>

      {category && (
        <Card className="ai-result-card">
          <Typography.Title level={5}>Kategori Terpilih</Typography.Title>
          <pre className="ai-pre">{category}</pre>
        </Card>
      )}
    </div>
  );
}
