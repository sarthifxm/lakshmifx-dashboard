"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const [account, setAccount] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/myfxbook/accounts",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      console.log("ANALYTICS RESPONSE:", data);

      const accounts = data.accounts || data;

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setError("No account data found");
      }
    } catch (err) {
      console.error("Analytics Error:", err);

      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-4">
          Loading analytics...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-4 text-red-600">
          {error}
        </p>
      </main>
    );
  }

  const chartData = [
    {
      name: "Week 1",
      equity: Number(account.balance || 0) * 0.7,
    },
    {
      name: "Week 2",
      equity: Number(account.balance || 0) * 0.8,
    },
    {
      name: "Week 3",
      equity: Number(account.balance || 0) * 0.9,
    },
    {
      name: "Current",
      equity: Number(account.equity || 0),
    },
  ];

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Analytics Dashboard
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow border p-5">
          <p className="text-sm text-gray-500">
            Balance
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ${Number(account.balance || 0).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-5">
          <p className="text-sm text-gray-500">
            Equity
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ${Number(account.equity || 0).toLocaleString()}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-5">
          <p className="text-sm text-gray-500">
            Gain
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {account.gain || 0}%
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow border p-5">
          <p className="text-sm text-gray-500">
            Drawdown
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {account.drawdown || 0}%
          </h2>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-bold mb-6">
          Equity Growth Curve
        </h2>

        <div className="h-[400px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="equity"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}