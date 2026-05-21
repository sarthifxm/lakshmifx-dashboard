"use client";

import { useState } from "react";

export default function MapAccount() {
  const [investorId, setInvestorId] = useState("");
  const [accountId, setAccountId] = useState("");

  const mapAccount = async () => {
    await fetch("/api/map-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ investorId, accountId }),
    });

    alert("Mapped successfully");
  };

  return (
    <div>
      <h2>Map Account</h2>

      <input
        placeholder="Investor ID"
        value={investorId}
        onChange={(e) => setInvestorId(e.target.value)}
      />

      <input
        placeholder="Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />

      <button onClick={mapAccount}>Map</button>
    </div>
  );
}