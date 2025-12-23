import { Layout, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./TopHeader.css";

export default function TopHeader() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      setUsername(decoded.name || "User");
    } catch {
      setUsername("User");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: <span onClick={logout}>Logout</span>
    }
  ];

  return (
    <Layout.Header className="top-header">
      <div className="top-header-left">
        <h2 className="top-header-title">FinanceHero Dashboard</h2>
      </div>

      <div className="top-header-right">
        <Dropdown menu={{ items }} placement="bottomRight">
          <div className="user-box">
            <UserOutlined className="user-icon" />
            <span className="username-text">{username}</span>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
}
