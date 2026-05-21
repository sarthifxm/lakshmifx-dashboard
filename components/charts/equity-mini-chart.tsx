"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { equitySeries } from "@/lib/mock-data";

export function EquityMiniChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={equitySeries}>
          <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="equity" stroke="#0f766e" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="balance" stroke="#94a3b8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
