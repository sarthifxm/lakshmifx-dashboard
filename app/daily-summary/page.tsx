"use client";

import { useEffect, useState } from "react";

export default function DailySummaryPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch("/api/daily-summary");
      const json = await res.json();

      if (json.success) {
        setData(json.data);
      } else {
        setData(null);
      }
    } catch (err) {
      console.log(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white font-bold text-2xl p-10">
        Loading Daily Summary...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-white font-bold text-2xl p-10">
        No Data Found ❌
      </div>
    );
  }

  return (
    <div className="p-10 text-white space-y-6">

      <h1 className="text-3xl font-extrabold">
        Daily Summary Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card label="Accounts" value={data.totalAccounts} />
        <Card label="Balance" value={`$${data.totalBalance}`} />
        <Card label="Equity" value={`$${data.totalEquity}`} />
        <Card label="Profit" value={`$${data.totalProfit}`} />

        <Card label="Avg Gain" value={`${data.avgGain.toFixed(2)}%`} />
        <Card label="Max DD" value={`${data.maxDrawdown.toFixed(2)}%`} />
        <Card label="Profitable" value={data.profitableAccounts} />
        <Card label="Losing" value={data.losingAccounts} />

      </div>

    </div>
  );
}

function Card({ label, value }: any) {
  return (
    <div className="border border-white/20 rounded-xl p-4">
      <div className="text-white/90 font-bold text-sm">{label}</div>
      <div className="text-white font-extrabold text-xl">{value}</div>
    </div>
  );
}