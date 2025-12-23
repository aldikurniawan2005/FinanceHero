// src/components/Sidebar.jsx
import { Menu } from "antd";
import {
  PieChartOutlined,
  TableOutlined,
  StarOutlined,
  AimOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "/transactions", icon: <TableOutlined />, label: "Transaksi" },
    { key: "/goals", icon: <AimOutlined />, label: "Goals" },
    { key: "/stats", icon: <StarOutlined />, label: "Statistik" },

    // 🔥 Semua menu AI
    { key: "/insights-ai", icon: <RobotOutlined />, label: "AI Insights" },
    { key: "/ai-budget", icon: <StarOutlined />, label: "AI Budget" },
    {
      key: "/ai-smart-category",
      icon: <StarOutlined />,
      label: "AI Categorizer",
    },
    { key: "/ai-saving", icon: <StarOutlined />, label: "AI Saving Plan" },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-title">FinanceHero</div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={(e) => navigate(e.key)}
        items={menuItems}
      />
    </div>
  );
}
