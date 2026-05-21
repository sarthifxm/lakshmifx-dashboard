"use client";

import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [investors, setInvestors] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // LOAD DATA
  const loadData = async () => {
    const inv = await fetch("/api/investors").then((r) => r.json());
    const log = await fetch("/api/logs").then((r) => r.json());

    setInvestors(inv.data || []);
    setLogs(log.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ADD INVESTOR
  const addInvestor = async () => {
    await fetch("/api/investors", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
    });

    setName("");
    setEmail("");
    setPhone("");

    loadData();
  };

  // SYNC MYFXBOOK
  const syncNow = async () => {
    await fetch("/api/sync", { method: "POST" });
    loadData();
  };

  return (
    <div style={{ padding: 20, background: "#0b0f19", color: "white" }}>
      <h1>🚀 Admin Panel (Fully Connected)</h1>

      {/* ADD INVESTOR */}
      <div style={box}>
        <h3>Add Investor</h3>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />

        <button onClick={addInvestor} style={btnGreen}>
          ➕ Add Investor
        </button>
      </div>

      {/* ACTIONS */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={syncNow} style={btnBlue}>
          🔄 Run MyFXBook Sync
        </button>
      </div>

      {/* INVESTORS */}
      <div style={box}>
        <h3>Investors</h3>

        {investors.map((i) => (
          <div key={i.id} style={card}>
            <b>{i.name}</b> | {i.email} | {i.phone}
            <br />
            Account: {i.accountId || "Not mapped"}
          </div>
        ))}
      </div>

      {/* LOGS */}
      <div style={box}>
        <h3>Sync Logs</h3>

        {logs.map((l, i) => (
          <div key={i} style={log}>
            {l.time} — {l.message}
          </div>
        ))}
      </div>
    </div>
  );
}

const box = { border: "1px solid #333", padding: 15, marginTop: 15 };
const input = { display: "block", margin: 5, padding: 8, width: 250 };
const btnGreen = { background: "green", padding: 10, color: "white" };
const btnBlue = { background: "#2563eb", padding: 10, color: "white" };
const card = { padding: 10, borderBottom: "1px solid #222" };
const log = { fontSize: 12, color: "#aaa" };