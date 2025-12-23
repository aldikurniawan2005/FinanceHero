import { useEffect, useState } from "react";
import api from "../api/api";
import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function StatsPage() {
  const [stats, setStats] = useState({
    income: 0,
    expense: 0,
  });

  const [chartData, setChartData] = useState([]);

  const loadStats = async () => {
    const res = await api.get("/stats");
    setStats(res.data.stats);
    setChartData(res.data.chart);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Header */}
      <h1
        style={{
          marginBottom: 25,
          fontSize: 28,
          fontWeight: 700,
          color: "#1f1f1f",
        }}
      >
        📊 Statistik Keuangan
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 25,
        }}
      >
        <Card
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 14,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ color: "#888" }}>Total Income</h3>
          <h1 style={{ color: "#1677ff", marginTop: 5 }}>Rp {stats.income}</h1>
        </Card>

        <Card
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 14,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ color: "#888" }}>Total Expense</h3>
          <h1 style={{ color: "#ff4d4f", marginTop: 5 }}>Rp {stats.expense}</h1>
        </Card>
      </div>

      {/* Chart Card */}
      <Card
        style={{
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          style={{
            marginBottom: 20,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          📈 Grafik Income vs Expense
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="4 3" opacity={0.3} />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="income" fill="#1677ff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ff4d4f" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
