"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      const response = await fetch("/api/myfxbook");

      const data = await response.json();

      console.log("Dashboard Data:", data);

      if (data.success) {
        setAccounts(
  data?.data?.accounts ||
  data?.accounts ||
  []
);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white text-3xl font-extrabold">
        Loading Dashboard...
      </div>
    );
  }

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + Number(acc.balance || 0),
    0
  );

  const totalEquity = accounts.reduce(
    (sum, acc) => sum + Number(acc.equity || 0),
    0
  );

  const totalGain = accounts.reduce(
    (sum, acc) => sum + Number(acc.gain || 0),
    0
  );

  const totalDrawdown = Math.max(
    ...accounts.map((acc) => Number(acc.drawdown || 0)),
    0
  );

  const totalDeposits = accounts.reduce(
    (sum, acc) => sum + Number(acc.deposits || 0),
    0
  );

  const totalWithdrawals = accounts.reduce(
    (sum, acc) => sum + Number(acc.withdrawals || 0),
    0
  );

  const totalProfit = accounts.reduce(
    (sum, acc) => sum + Number(acc.profit || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8 font-bold">

      {/* HEADER */}
      <div className="mb-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              LAKSHMIFX Dashboard
            </h1>

            <p className="text-slate-200 font-bold mt-3 text-lg">
              Real-Time Myfxbook Trading Analytics
            </p>
          </div>

          <div className="bg-slate-900 border border-cyan-400 px-6 py-4 rounded-2xl shadow-2xl">
            <p className="text-slate-200 text-sm font-bold">
              Active Accounts
            </p>

            <p className="text-4xl font-extrabold text-cyan-300">
              {accounts.length}
            </p>
          </div>

        </div>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">

        <div className="bg-gradient-to-br from-cyan-500 to-blue-700 p-6 rounded-3xl shadow-2xl">
          <p className="text-sm font-bold text-white">
            Total Balance
          </p>

          <h2 className="text-3xl font-extrabold mt-3 text-white">
            ${totalBalance.toLocaleString()}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-700 p-6 rounded-3xl shadow-2xl">
          <p className="text-sm font-bold text-white">
            Total Equity
          </p>

          <h2 className="text-3xl font-extrabold mt-3 text-white">
            ${totalEquity.toLocaleString()}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-700 p-6 rounded-3xl shadow-2xl">
          <p className="text-sm font-bold text-white">
            Total Gain
          </p>

          <h2 className="text-3xl font-extrabold mt-3 text-white">
            {totalGain.toFixed(2)}%
          </h2>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-pink-700 p-6 rounded-3xl shadow-2xl">
          <p className="text-sm font-bold text-white">
            Drawdown
          </p>

          <h2 className="text-3xl font-extrabold mt-3 text-white">
            {totalDrawdown.toFixed(2)}%
          </h2>
        </div>

        <div className="bg-gradient-to-br from-violet-500 to-purple-700 p-6 rounded-3xl shadow-2xl">
          <p className="text-sm font-bold text-white">
            Deposits
          </p>

          <h2 className="text-3xl font-extrabold mt-3 text-white">
            ${totalDeposits.toLocaleString()}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-700 p-6 rounded-3xl shadow-2xl">
          <p className="text-sm font-bold text-white">
            Withdrawals
          </p>

          <h2 className="text-3xl font-extrabold mt-3 text-white">
            ${totalWithdrawals.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* PERFORMANCE SECTION */}
      <div className="bg-slate-900 border border-slate-500 rounded-3xl p-8 shadow-2xl backdrop-blur-md mb-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>
            <p className="text-slate-200 font-bold text-lg">
              Overall Net Profit
            </p>

            <h2 className="text-6xl font-extrabold text-emerald-400 mt-3">
              ${totalProfit.toLocaleString()}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-slate-800 border border-slate-500 p-6 rounded-2xl">
              <p className="text-slate-200 font-bold text-sm">
                Total Accounts
              </p>

              <h3 className="text-3xl font-extrabold mt-2 text-white">
                {accounts.length}
              </h3>
            </div>

            <div className="bg-slate-800 border border-slate-500 p-6 rounded-2xl">
              <p className="text-slate-200 font-bold text-sm">
                Live Equity
              </p>

              <h3 className="text-3xl font-extrabold text-cyan-300 mt-2">
                ${totalEquity.toLocaleString()}
              </h3>
            </div>

          </div>

        </div>

      </div>

      {/* ACCOUNT LIST */}
      <div className="bg-slate-900 border border-slate-500 rounded-3xl p-8 shadow-2xl backdrop-blur-md">

        <h2 className="text-3xl font-extrabold mb-8 text-cyan-300">
          Trading Accounts
        </h2>

        {accounts.length === 0 ? (
          <div className="text-center text-slate-200 text-xl font-bold py-10">
            No accounts found
          </div>
        ) : (
          <div className="space-y-8">

            {accounts.map((account: any) => (

              <div
                key={account.id}
                className="bg-slate-800 border border-slate-500 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-300 shadow-xl"
              >

                <div className="flex flex-col xl:flex-row xl:justify-between gap-8">

                  {/* LEFT SIDE */}
                  <div className="xl:w-1/3">

                    <h3 className="text-3xl font-extrabold text-white">
                      {account.name}
                    </h3>

                    <div className="space-y-3 mt-5 text-white font-bold">

                      <p>
                        <span className="text-cyan-300 font-extrabold">
                          Broker:
                        </span>{" "}
                        {account.server?.name || "N/A"}
                      </p>

                      <p>
                        <span className="text-cyan-300 font-extrabold">
                          Account ID:
                        </span>{" "}
                        {account.accountId}
                      </p>

                      <p>
                        <span className="text-cyan-300 font-extrabold">
                          Currency:
                        </span>{" "}
                        {account.currency}
                      </p>

                      <p>
                        <span className="text-cyan-300 font-extrabold">
                          Last Update:
                        </span>{" "}
                        {account.lastUpdateDate}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT SIDE */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5 xl:w-2/3">

                    <div className="bg-gradient-to-br from-emerald-500 to-green-700 p-5 rounded-2xl shadow-lg">
                      <p className="text-sm font-bold text-white">
                        Gain
                      </p>

                      <h4 className="text-2xl font-extrabold mt-2 text-white">
                        {account.gain}%
                      </h4>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500 to-blue-700 p-5 rounded-2xl shadow-lg">
                      <p className="text-sm font-bold text-white">
                        Balance
                      </p>

                      <h4 className="text-2xl font-extrabold mt-2 text-white">
                        ${Number(account.balance || 0).toLocaleString()}
                      </h4>
                    </div>

                    <div className="bg-gradient-to-br from-violet-500 to-purple-700 p-5 rounded-2xl shadow-lg">
                      <p className="text-sm font-bold text-white">
                        Equity
                      </p>

                      <h4 className="text-2xl font-extrabold mt-2 text-white">
                        ${Number(account.equity || 0).toLocaleString()}
                      </h4>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500 to-orange-700 p-5 rounded-2xl shadow-lg">
                      <p className="text-sm font-bold text-white">
                        Profit
                      </p>

                      <h4 className="text-2xl font-extrabold mt-2 text-white">
                        ${Number(account.profit || 0).toLocaleString()}
                      </h4>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-pink-700 p-5 rounded-2xl shadow-lg">
                      <p className="text-sm font-bold text-white">
                        Drawdown
                      </p>

                      <h4 className="text-2xl font-extrabold mt-2 text-white">
                        {account.drawdown}%
                      </h4>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-blue-800 p-5 rounded-2xl shadow-lg">
                      <p className="text-sm font-bold text-white">
                        Profit Factor
                      </p>

                      <h4 className="text-2xl font-extrabold mt-2 text-white">
                        {account.profitFactor}
                      </h4>
                    </div>

                    <div className="bg-slate-800 border border-slate-500 p-5 rounded-2xl">
                      <p className="text-slate-200 font-bold text-sm">
                        Deposits
                      </p>

                      <h4 className="text-xl font-extrabold mt-2 text-white">
                        ${Number(account.deposits || 0).toLocaleString()}
                      </h4>
                    </div>

                    <div className="bg-slate-800 border border-slate-500 p-5 rounded-2xl">
                      <p className="text-slate-200 font-bold text-sm">
                        Withdrawals
                      </p>

                      <h4 className="text-xl font-extrabold mt-2 text-white">
                        ${Number(account.withdrawals || 0).toLocaleString()}
                      </h4>
                    </div>

                    <div className="bg-slate-800 border border-slate-500 p-5 rounded-2xl">
                      <p className="text-slate-200 font-bold text-sm">
                        Pips
                      </p>

                      <h4 className="text-xl font-extrabold mt-2 text-white">
                        {account.pips}
                      </h4>
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );

}