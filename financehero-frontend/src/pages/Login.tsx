import { useState } from "react";
import { Card, Input, Button, message } from "antd";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      message.success("Login berhasil");
      nav("/");
    } catch {
      message.error("Login gagal");
    }
  };

  return (
    <Card style={{ maxWidth: 350, margin: "80px auto" }}>
      <h2>Login</h2>
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" style={{ marginTop: 10 }} onChange={(e) => setPassword(e.target.value)} />
      <Button type="primary" block style={{ marginTop: 15 }} onClick={login}>Login</Button>
      <p style={{ marginTop: 10 }} onClick={() => nav("/register")}>Belum punya akun?</p>
    </Card>
  );
}
