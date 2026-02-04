"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Mock data matching the Figma design
const chartData = [
  { time: "18:11 AM", teg1: 100, teg2: 45 },
  { time: "12:00:00 PM", teg1: 140, teg2: 50 },
  { time: "13:00:00 PM", teg1: 90, teg2: 30 },
  { time: "14:00:00 PM", teg1: 145, teg2: 65 },
  { time: "15:00:00 PM", teg1: 100, teg2: 50 },
  { time: "16:00:00 PM", teg1: 165, teg2: 60 },
  { time: "17:00:00 PM", teg1: 135, teg2: 55 },
];

const miniChartData = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y1: Math.random() * 20 + 10,
  y2: Math.random() * 15 + 5,
}));

interface DashboardLineChartProps {
  className?: string;
}

export function DashboardLineChart({ className }: DashboardLineChartProps) {
  return (
    <div className={cn(className)}>
      {/* Main Chart */}
      <div className="h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6a7282", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6a7282", fontSize: 12 }}
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#242a37", fontWeight: 600 }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: 20 }}
              formatter={(value) => <span className="text-sm text-[#242a37]">{value}</span>}
            />
            <Line
              type="linear"
              dataKey="teg1"
              name="Teg 1: Data"
              stroke="#3347be"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3347be" }}
            />
            <Line
              type="linear"
              dataKey="teg2"
              name="Teg 2: Data"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#22c55e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Timeline */}
      <div className="mt-4 h-6 rounded bg-[#f3f4f6] overflow-hidden relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={miniChartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
            <Line type="monotone" dataKey="y1" stroke="#3347be" strokeWidth={1} dot={false} />
            <Line type="monotone" dataKey="y2" stroke="#22c55e" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        {/* Selection handles */}
        <div className="absolute left-0 top-0 h-full w-2.5 bg-[#3347be] rounded-l cursor-ew-resize" />
        <div className="absolute right-0 top-0 h-full w-2.5 bg-[#3347be] rounded-r cursor-ew-resize" />
      </div>

      {/* Timestamp badge */}
      <div className="mt-2">
        <Badge variant="secondary" className="rounded bg-[#f3f4f6] px-2 py-1 text-xs text-[#6a7282] font-normal">
          09/14/2025 14:00
        </Badge>
      </div>
    </div>
  );
}
