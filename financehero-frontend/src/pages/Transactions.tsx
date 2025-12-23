import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Select,
  message,
  Tag,
  Card,
  Space,
} from "antd";
import api from "../api/api";

export default function Transactions() {
  const [list, setList] = useState([]);
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("income");
  const [goalId, setGoalId] = useState(null);

  const loadData = async () => {
    const res = await api.get("/transactions");
    setList(res.data.transactions);
  };

  const loadGoals = async () => {
    const res = await api.get("/goals");
    setGoals(res.data.goals);
  };

  useEffect(() => {
    loadData();
    loadGoals();
  }, []);

  const add = async () => {
    await api.post("/transactions", {
      amount: Number(amount),
      description: desc,
      type,
      goalId,
      date: new Date().toISOString().slice(0, 10),
    });

    message.success("Transaksi ditambahkan");
    setOpen(false);
    loadData();
  };

  const del = async (id) => {
    await api.delete(`/transactions/${id}`);
    message.success("Transaksi dihapus");
    loadData();
  };

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  return (
    <>
      <Card
        title="Daftar Transaksi"
        style={{
          borderRadius: 12,
          padding: 10,
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        }}
        extra={
          <Button type="primary" size="large" onClick={() => setOpen(true)}>
            + Tambah Transaksi
          </Button>
        }
      >
        <Table
          rowKey="id"
          dataSource={list}
          style={{ marginTop: 10 }}
          pagination={{ pageSize: 6 }}
          columns={[
            { title: "Deskripsi", dataIndex: "description" },

            {
              title: "Tipe",
              dataIndex: "type",
              render: (t) =>
                t === "income" ? (
                  <Tag color="green">Income</Tag>
                ) : (
                  <Tag color="red">Expense</Tag>
                ),
            },

            {
              title: "Jumlah",
              dataIndex: "amount",
              render: (v) => (
                <b style={{ color: v > 0 ? "#1677ff" : "#ff4d4f" }}>
                  {formatRupiah(v)}
                </b>
              ),
            },

            { title: "Tanggal", dataIndex: "date" },

            {
              title: "Aksi",
              render: (r) => (
                <Button danger onClick={() => del(r.id)}>
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </Card>

      {/* ===== MODAL ===== */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={add}
        title="Tambah Transaksi"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Jumlah"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />

          <Input
            placeholder="Deskripsi"
            onChange={(e) => setDesc(e.target.value)}
          />

          <Select
            defaultValue="income"
            style={{ width: "100%" }}
            onChange={(v) => setType(v)}
            options={[
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />

          <Select
            placeholder="Pilih Goal (opsional)"
            style={{ width: "100%" }}
            allowClear
            onChange={(v) => setGoalId(v)}
            options={goals.map((g) => ({
              value: g.id,
              label: `${g.title} — Rp${g.currentAmount}/${g.targetAmount}`,
            }))}
          />
        </Space>
      </Modal>
    </>
  );
}
