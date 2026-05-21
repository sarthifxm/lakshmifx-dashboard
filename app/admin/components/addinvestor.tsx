"use client";

import { useState } from "react";

export default function AddInvestor() {
  const [name, setName] = useState("");

  const addInvestor = async () => {
    await fetch("/api/investors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    alert("Investor added");
    setName("");
  };

  return (
    <div>
      <h2>Add Investor</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Investor name"
      />

      <button onClick={addInvestor}>Add</button>
    </div>
  );
}