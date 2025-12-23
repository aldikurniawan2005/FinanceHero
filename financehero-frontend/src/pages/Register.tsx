import { useState } from "react";
import { Card, Input, Button, message } from "antd";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      message.success("Register berhasil");
      nav("/login");
    } catch {
      message.error("Gagal register");
    }
  };

  return (
    <Card style={{ maxWidth: 350, margin: "80px auto" }}>
      <h2>Register</h2>
      <Input placeholder="Nama" onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" style={{ marginTop: 10 }} onChange={(e) => setEmail(e.target.value)} />
      <Input.Password placeholder="Password" style={{ marginTop: 10 }} onChange={(e) => setPassword(e.target.value)} />
      <Button type="primary" block style={{ marginTop: 15 }} onClick={register}>Daftar</Button>
    </Card>
  );
}
