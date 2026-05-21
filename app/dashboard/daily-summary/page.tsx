"use client";

import { useEffect, useState } from "react";

interface AccountData {
  id: number;
  name?: string;
  balance?: number;
  gain?: number;
  dailyGain?: number;
}

export default function DailySummaryPage() {
  const [dailyData, setDailyData] = useState<AccountData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      // Call your API route
      const response = await fetch("/api/daily-summary");

      const result = await response.json();

      if (!result.success) {
        console.log(result.message);
        setDailyData([]);
        setLoading(false);
        return;
      }

      const accounts = result.accounts || [];

      const formattedData: AccountData[] = accounts.map(
        (acc: any) => ({
          id: acc.id,
          name: acc.name || "Unknown Account",
          balance: acc.balance || 0,
          gain: acc.gain || 0,
          dailyGain: acc.gain || 0,
        })
      );

      setDailyData(formattedData);
      setLoading(false);
    } catch (error) {
      console.log("Load Error:", error);
      setDailyData([]);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Daily Summary
      </h1>

      {loading && (
        <p className="text-white font-semibold">
          Loading data...
        </p>
      )}

      {!loading && dailyData.length === 0 && (
        <p className="text-red-400 font-semibold">
          No data found
        </p>
      )}

      <div className="grid gap-4">
        {dailyData.map((acc) => (
          <div
            key={acc.id}
            className="border border-gray-700 bg-gray-900 rounded-2xl p-5 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              {acc.name}
            </h2>

            <p className="text-white text-lg font-medium">
              Balance: $
              {Number(acc.balance).toLocaleString()}
            </p>

            <p className="text-green-400 text-lg font-bold mt-2">
              Total Gain: {acc.gain}%
            </p>

            <p className="text-blue-400 text-lg font-bold mt-2">
              Daily Gain: {acc.dailyGain}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}