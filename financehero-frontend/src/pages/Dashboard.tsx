import { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    income: 0,
    expense: 0,
    risk: "Normal",
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api
      .get("/stats")
      .then((res) => {
        setStats(res.data.stats);
        setChartData(res.data.chart);
      })
      .catch((err) => console.log(err));
  }, []);

  const formatRupiah = (num) => num.toLocaleString("id-ID");

  const cardStyle = {
    borderRadius: 14,
    padding: 10,
    background: "linear-gradient(135deg, #ffffff, #f4f7ff)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
  };

  return (
    <>
      <h2 style={{ marginBottom: 20, fontWeight: 700 }}>📊 Dashboard Keuangan</h2>

      <Row gutter={20} style={{ marginBottom: 20 }}>
        
        <Col span={8}>
          <Card hoverable style={cardStyle}>
            <h3 style={{ marginBottom: 5, opacity: 0.7 }}>Total Income</h3>
            <h1 style={{ color: "#1677ff", fontWeight: 800 }}>
              Rp {formatRupiah(stats.income)}
            </h1>
          </Card>
        </Col>

        <Col span={8}>
          <Card hoverable style={cardStyle}>
            <h3 style={{ marginBottom: 5, opacity: 0.7 }}>Total Expense</h3>
            <h1 style={{ color: "#ff4d4f", fontWeight: 800 }}>
              Rp {formatRupiah(stats.expense)}
            </h1>
          </Card>
        </Col>

        <Col span={8}>
          <Card hoverable style={cardStyle}>
            <h3 style={{ marginBottom: 5, opacity: 0.7 }}>Risk Score</h3>
            <h1 style={{ color: "#fa8c16", fontWeight: 800 }}>{stats.risk}</h1>
          </Card>
        </Col>

      </Row>

      <Card
        style={{
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)"
        }}
      >
        <h3 style={{ marginBottom: 20, fontWeight: 600 }}>📈 Pemasukan vs Pengeluaran</h3>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="income" stroke="#1677ff" strokeWidth={3} />
              <Line type="monotone" dataKey="expense" stroke="#ff4d4f" strokeWidth={3} />
              <CartesianGrid stroke="#ddd" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
}
