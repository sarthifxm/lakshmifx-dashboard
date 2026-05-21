"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function EquityChart({
  data
}: {
  data: { day: string; equity: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#01696f" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#01696f" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(40,37,29,0.1)" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 500", "dataMax + 500"]}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#01696f"
            strokeWidth={2}
            fill="url(#equityFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}