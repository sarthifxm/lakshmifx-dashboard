"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function connectMyfxbook() {
    try {
      setStatus("Connecting...");

      const response = await fetch("/api/myfxbook/connect", {
        method: "POST",
      });

      const data = await response.json();
      if (data.session) {
  localStorage.setItem("myfxbook_session", data.session);
}

      console.log(data);

      if (data.success) {
        setStatus("Connected successfully");
      } else {
        setStatus(data.error || "Connection failed");
      }
    } catch (error: any) {
      console.error(error);
      setStatus(error.message);
    }
  }

  async function loadAccounts() {
    try {
      setLoading(true);
      setStatus("Loading accounts...");

      const response = await fetch("/api/myfxbook/accounts");

      const data = await response.json();

      console.log("FULL RESPONSE:", data);

      let accountsArray = [];

      if (Array.isArray(data)) {
        accountsArray = data;
      } else if (Array.isArray(data.accounts)) {
        accountsArray = data.accounts;
      } else if (Array.isArray(data.data)) {
        accountsArray = data.data;
      }

      setAccounts(accountsArray);

      setStatus(`Loaded ${accountsArray.length} accounts`);
    } catch (error: any) {
      console.error(error);
      setStatus(error.message || "Unable to load accounts");
    } finally {
      setLoading(false);
    }
  }

  async function myfxbookLogout() {
    try {
      setStatus("Logging out...");

      await fetch("/api/myfxbook/logout", {
        method: "POST",
      });

      setAccounts([]);

      setStatus("Logged out successfully");
    } catch (error: any) {
      console.error(error);
      setStatus(error.message);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">
        LAKSHMIFX Investor Dashboard
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={connectMyfxbook}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Connect
        </button>

        <button
          onClick={loadAccounts}
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Load Accounts
        </button>

        <button
          onClick={myfxbookLogout}
          className="bg-red-600 text-white px-5 py-3 rounded-xl"
        >
          Logout
        </button>
      </div>

      {/* STATUS */}
      <div className="mb-6 text-lg font-medium">
        Status: {status}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mb-6 text-xl">
          Loading...
        </div>
      )}

      {/* ACCOUNTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">
              {account.name}
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Balance:</strong>{" "}
                ${account.balance?.toLocaleString()}
              </p>

              <p>
                <strong>Equity:</strong>{" "}
                ${account.equity?.toLocaleString()}
              </p>

              <p>
                <strong>Gain:</strong>{" "}
                {account.gain}%
              </p>

              <p>
                <strong>Drawdown:</strong>{" "}
                {account.drawdown}%
              </p>

              <p>
                <strong>Broker:</strong>{" "}
                {account.server?.name}
              </p>

              <p>
                <strong>Last Update:</strong>{" "}
                {account.lastUpdateDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}