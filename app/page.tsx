"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAccounts() {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/myfxbook/accounts"
        );

        const data = await response.json();

        console.log("API RESPONSE:", data);

        if (data.error) {
          setError(data.message || "API Error");
          return;
        }

        if (Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
        } else if (Array.isArray(data)) {
          setAccounts(data);
        } else {
          setError("Invalid API response");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load accounts");
      } finally {
        setLoading(false);
      }
    }

    loadAccounts();
  }, []);

  return (
    <main style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        MyFXBook Dashboard
      </h1>

      {loading && <p>Loading accounts...</p>}

      {error && (
        <p style={{ color: "red" }}>
          Status: {error}
        </p>
      )}

      {!loading &&
        !error &&
        accounts.map((account) => (
          <div
            key={account.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>{account.name}</h2>

            <p>
              Balance: $
              {account.balance?.toLocaleString()}
            </p>

            <p>
              Equity: $
              {account.equity?.toLocaleString()}
            </p>

            <p>
              Gain: {account.gain}%
            </p>

            <p>
              Daily: {account.daily}%
            </p>

            <p>
              Monthly: {account.monthly}%
            </p>

            <p>
              Profit: $
              {account.profit?.toLocaleString()}
            </p>

            <p>
              Drawdown: {account.drawdown}%
            </p>

            <p>
              Server: {account.server?.name}
            </p>
          </div>
        ))}
    </main>
  );
}