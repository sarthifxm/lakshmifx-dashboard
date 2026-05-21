"use client";

import { useEffect, useState } from "react";
import {
  myfxbookLogin,
  myfxbookGetAccounts,
  myfxbookGetOpenTrades,
} from "@/lib/myfxbook";

export default function OpenTradesPage() {
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1. LOGIN
      const session = await myfxbookLogin();

      // 2. ACCOUNTS
      const acc = await myfxbookGetAccounts(session);
      setAccounts(acc);

      if (!acc || acc.length === 0) {
        setError("No accounts found");
        return;
      }

      // 3. USE FIRST ACCOUNT (or change logic later)
      const accountId = acc[0].id;

      // 4. OPEN TRADES
      const tr = await myfxbookGetOpenTrades(session, accountId);
      setTrades(tr);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white p-6 font-bold">
        Loading Open Trades...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white p-6 font-bold">
        Error: {error}
      </div>
    );
  }

  const account = accounts[0];
  const lastSync = account?.lastUpdateDate || "N/A";

  return (
    <div className="p-6 text-white space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Open Trades
        </h1>

        <p className="text-white/90 font-semibold">
          Last Sync: {lastSync}
        </p>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/10">
        <div className="text-white font-bold">
          Account ID: {account?.id}
        </div>

        <div className="text-white font-bold">
          Balance: {account?.balance}
        </div>

        <div className="text-white font-bold">
          Equity: {account?.equity}
        </div>
      </div>

      {/* TRADES */}
      <div className="space-y-3">
        {trades.length === 0 ? (
          <div className="text-white font-bold">
            No open trades
          </div>
        ) : (
          trades.map((t, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-white/10 bg-black/30"
            >
              <div className="text-white font-bold">
                {t.symbol}
              </div>

              <div className="text-white font-bold">
                Profit: {t.profit}
              </div>

              <div className="text-white/90">
                Open Price: {t.openPrice}
              </div>

              <div className="text-white/90">
                Current Price: {t.currentPrice}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}