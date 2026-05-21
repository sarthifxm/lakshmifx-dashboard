"use client";

import { useEffect, useState } from "react";

export default function MyfxbookTestPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [status, setStatus] = useState("Ready");

  async function connectMyfxbook() {
    try {
      setStatus("Connecting...");

      const response = await fetch("/api/myfxbook/connect", {
        method: "POST",
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.session) {
        localStorage.setItem("myfxbook_session", data.session);
        setStatus("Connected successfully");
      } else {
        setStatus("No session returned");
      }
    } catch (error) {
      console.error(error);
      setStatus("Connection failed");
    }
  }

  async function loadAccounts() {
    try {
      setStatus("Loading accounts...");

      const response = await fetch("/api/myfxbook/accounts");

      const data = await response.json();

      console.log("ACCOUNTS:", data);

      if (data.accounts) {
        setAccounts(data.accounts);
        setStatus(`Loaded ${data.accounts.length} accounts`);
      } else {
        setStatus("No accounts found");
      }
    } catch (error) {
      console.error(error);
      setStatus("Unable to load accounts");
    }
  }

  function logout() {
    localStorage.removeItem("myfxbook_session");
    setAccounts([]);
    setStatus("Logged out");
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Myfxbook Test</h1>

      <div className="flex gap-4">
        <button
          onClick={connectMyfxbook}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Connect
        </button>

        <button
          onClick={loadAccounts}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Load Accounts
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-4 border rounded bg-gray-100">
        <strong>Status:</strong> {status}
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="border rounded p-4 shadow bg-white"
          >
            <h2 className="text-xl font-semibold">
              {account.name || "Unnamed Account"}
            </h2>

            <p>Balance: ${account.balance}</p>
            <p>Equity: ${account.equity}</p>
            <p>Gain: {account.gain}%</p>
            <p>Drawdown: {account.drawdown}%</p>
            <p>Broker: {account.broker || "N/A"}</p>
            <p>Server: {account.server?.name || "N/A"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}