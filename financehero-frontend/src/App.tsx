import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import AppRoutes from "./router/AppRouter";

import "./index.css";
import "./App.css";

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider width={220}>
        <Sidebar />
      </Layout.Sider>

      <Layout>
        <TopHeader />

        <Layout.Content>
          <AppRoutes />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
