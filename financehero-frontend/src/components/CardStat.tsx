import { Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export default function CardStat({title, value, type}: any) {
  return (
    <Card style={{ borderRadius: 10 }}>
      <h4 style={{ marginBottom: 10 }}>{title}</h4>

      <h2 style={{ fontWeight: "bold" }}>
        {value}
      </h2>

      {type === "up" && (
        <p style={{ color: "green" }}>
          <ArrowUpOutlined /> Increasing
        </p>
      )}

      {type === "down" && (
        <p style={{ color: "red" }}>
          <ArrowDownOutlined /> Decreasing
        </p>
      )}
    </Card>
  );
}
