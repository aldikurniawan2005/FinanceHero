import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  message,
  Progress,
  Card,
  Typography,
} from "antd";
import api from "../api/api";

const { Title } = Typography;

export default function Goals() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const load = async () => {
    const res = await api.get("/goals");
    setList(res.data.goals);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!title || !target) {
      return message.error("Judul dan target wajib diisi");
    }

    await api.post("/goals", {
      title,
      targetAmount: Number(target),
      deadline: "2025-12-31",
    });

    message.success("Goal berhasil ditambahkan");
    setOpen(false);
    setTitle("");
    setTarget("");
    load();
  };

  const del = async (id) => {
    await api.delete(`/goals/${id}`);
    message.success("Goal dihapus");
    load();
  };

  return (
    <>
      <Card
        style={{
          marginBottom: 20,
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={3} style={{ margin: 0 }}>
            🎯 Goals Keuangan Kamu
          </Title>

          <Button
            type="primary"
            size="large"
            style={{ borderRadius: 8 }}
            onClick={() => setOpen(true)}
          >
            + Tambah Goal
          </Button>
        </div>
      </Card>

      <Card
        style={{
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        <Table
          rowKey="id"
          dataSource={list}
          pagination={{ pageSize: 5 }}
          columns={[
            {
              title: "Goal",
              dataIndex: "title",
              render: (v) => <b>{v}</b>,
            },
            {
              title: "Target",
              dataIndex: "targetAmount",
              render: (v) => `Rp ${v.toLocaleString()}`,
              align: "center",
            },
            {
              title: "Current",
              dataIndex: "currentAmount",
              render: (v) => `Rp ${v.toLocaleString()}`,
              align: "center",
            },
            {
              title: "Progress",
              align: "center",
              render: (r) => {
                const percent = Math.min(
                  (r.currentAmount / r.targetAmount) * 100,
                  100
                );

                return (
                  <Progress
                    percent={percent}
                    strokeColor={{
                      "0%": "#1677ff",
                      "100%": "#52c41a",
                    }}
                    style={{ width: 140 }}
                  />
                );
              },
            },
            {
              title: "Deadline",
              dataIndex: "deadline",
              align: "center",
            },
            {
              title: "Aksi",
              align: "center",
              render: (r) => (
                <Button danger type="primary" onClick={() => del(r.id)}>
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </Card>

      {/* Modal Tambah Goal */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={add}
        okText="Simpan"
        cancelText="Batal"
        title="Tambah Goal Baru"
      >
        <Input
          placeholder="Judul Goal (contoh: Beli Motor)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <Input
          placeholder="Target (Rp)"
          value={target}
          style={{ marginTop: 15 }}
          onChange={(e) => setTarget(e.target.value)}
          type="number"
        />
      </Modal>
    </>
  );
}
