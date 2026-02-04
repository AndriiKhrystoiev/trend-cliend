"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// Mock data matching the Figma design
const chartData = [
  { time: "09:18:11 AM", teg1: 85, teg2: 120 },
  { time: "12:00:00 AM", teg1: 75, teg2: 130 },
  { time: "13:00:00 PM", teg1: 85, teg2: 155 },
  { time: "14:00:00 PM", teg1: 55, teg2: 115 },
  { time: "15:00:00 PM", teg1: 40, teg2: 100 },
  { time: "16:00:00 PM", teg1: 45, teg2: 155 },
  { time: "17:00:00 PM", teg1: 45, teg2: 150 },
];

// Mini timeline data
const miniChartData = Array.from({ length: 100 }, (_, i) => ({
  x: i,
  y1: 10 + Math.sin(i * 0.15) * 5 + Math.random() * 2,
  y2: 15 + Math.cos(i * 0.12) * 4 + Math.random() * 2,
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
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" horizontal={true} vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6a7282", fontSize: 12 }}
              dy={10}
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
                padding: "12px",
              }}
              labelStyle={{ color: "#242a37", fontWeight: 600, marginBottom: "8px" }}
              labelFormatter={() => "Data"}
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

      {/* Timestamp Badge */}
      <div className="mt-2 mb-2">
        <span className="inline-block bg-[#f3f4f6] rounded px-2 py-1 text-sm text-[#242a37]">
          09/14/2025 14:00
        </span>
      </div>

      {/* Mini Timeline */}
      <div className="h-6 rounded-sm bg-[#eef0fb] overflow-hidden relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={miniChartData} margin={{ top: 2, right: 12, left: 12, bottom: 2 }}>
            <Line type="monotone" dataKey="y1" stroke="#3347be" strokeWidth={1} dot={false} />
            <Line type="monotone" dataKey="y2" stroke="#22c55e" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        {/* Selection handles */}
        <div className="absolute left-0 top-0 h-full w-2.5 bg-[#3347be] rounded-l-sm cursor-ew-resize" />
        <div className="absolute right-0 top-0 h-full w-2.5 bg-[#3347be] rounded-r-sm cursor-ew-resize" />
      </div>
    </div>
  );
}
