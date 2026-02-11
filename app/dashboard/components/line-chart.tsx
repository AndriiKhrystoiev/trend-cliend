"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush, ReferenceArea } from "recharts";
import { cn } from "@/lib/utils";

// Generate time-based data for the mini timeline
const generateTimelineData = () => {
  const baseDate = new Date("2025-09-14T09:00:00");
  const data = [];

  for (let i = 0; i < 100; i++) {
    const time = new Date(baseDate.getTime() + i * 6 * 60 * 1000); // 6 minutes per point = 10 hours total
    data.push({
      index: i,
      time: time.toISOString(),
      displayTime: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      y1: 10 + Math.sin(i * 0.15) * 5 + Math.random() * 2,
      y2: 15 + Math.cos(i * 0.12) * 4 + Math.random() * 2,
    });
  }
  return data;
};

const miniChartData = generateTimelineData();

// Mock data matching the Figma design
const chartData = [
  { time: "09:18:11 AM", teg1: 85, teg2: 120 },
  { time: "12:00:00 PM", teg1: 75, teg2: 130 },
  { time: "13:00:00 PM", teg1: 85, teg2: 155 },
  { time: "14:00:00 PM", teg1: 55, teg2: 115 },
  { time: "15:00:00 PM", teg1: 40, teg2: 100 },
  { time: "16:00:00 PM", teg1: 45, teg2: 155 },
  { time: "17:00:00 PM", teg1: 45, teg2: 150 },
];

// Map pen IDs to chart dataKeys and colors
const penToChartMap: Record<string, { dataKey: string; color: string }> = {
  "1": { dataKey: "teg2", color: "#57637B" },
  "2": { dataKey: "teg1", color: "#57637B" },
};

interface DashboardLineChartProps {
  className?: string;
  selectedPenIds?: Set<string>;
  crosshairActive?: boolean;
}

// Format date for tooltip display
const formatDateForTooltip = (isoString: string) => {
  const date = new Date(isoString);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  return `${dateStr} ${timeStr}`;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with gray background */}
      <div className="bg-neutral-50 px-4 py-2">
        <p className="text-sm font-semibold text-neutral-900">Data</p>
      </div>
      {/* Content */}
      <div className="px-4 py-3 space-y-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-neutral-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to create a path with specific rounded corners
const createRoundedRectPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  side: 'left' | 'right'
) => {
  const r = radius;

  if (side === 'left') {
    // Rounded on left, square on right
    return `
      M ${x + r} ${y}
      L ${x + width} ${y}
      L ${x + width} ${y + height}
      L ${x + r} ${y + height}
      Q ${x} ${y + height} ${x} ${y + height - r}
      L ${x} ${y + r}
      Q ${x} ${y} ${x + r} ${y}
      Z
    `;
  } else {
    // Square on left, rounded on right
    return `
      M ${x} ${y}
      L ${x + width - r} ${y}
      Q ${x + width} ${y} ${x + width} ${y + r}
      L ${x + width} ${y + height - r}
      Q ${x + width} ${y + height} ${x + width - r} ${y + height}
      L ${x} ${y + height}
      L ${x} ${y}
      Z
    `;
  }
};

// Track traveller positions to determine left vs right
let travellerPositions: number[] = [];

// Smart traveller that detects if it's the left or right handle
const SmartTraveller = (props: { x: number; y: number; width: number; height: number }) => {
  const { x, y, height } = props;

  // Collect positions and determine side
  if (!travellerPositions.includes(x)) {
    travellerPositions.push(x);
    // Keep only last 2 positions
    if (travellerPositions.length > 2) {
      travellerPositions = travellerPositions.slice(-2);
    }
  }

  // Determine side based on position relative to other traveller
  const isLeftTraveller = travellerPositions.length < 2 || x <= Math.min(...travellerPositions);

  return (
    <g>
      <path
        d={createRoundedRectPath(x, y, 10, height, 4, isLeftTraveller ? 'left' : 'right')}
        fill="#3347be"
        style={{ cursor: "ew-resize" }}
      />
    </g>
  );
};

export function DashboardLineChart({ className, selectedPenIds, crosshairActive }: DashboardLineChartProps) {
  const [brushRange, setBrushRange] = useState({ startIndex: 0, endIndex: 99 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ x: number; date: string } | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [crosshairY, setCrosshairY] = useState<number | null>(null);

  const handleChartMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    setCrosshairY(e.clientY - rect.top);
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setCrosshairY(null);
  }, []);

  const handleBrushChange = useCallback((range: { startIndex?: number; endIndex?: number }) => {
    if (range.startIndex !== undefined && range.endIndex !== undefined) {
      setBrushRange({ startIndex: range.startIndex, endIndex: range.endIndex });
      setIsDragging(true);
    }
  }, []);

  // Hide tooltips after dragging stops
  const handleMouseUp = useCallback(() => {
    // Keep tooltips visible for a short moment after release
    setTimeout(() => setIsDragging(false), 1500);
  }, []);

  // Handle hover on timeline for point tooltip
  const handleTimelineMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const dataIndex = Math.round(percentage * (miniChartData.length - 1));
    const clampedIndex = Math.max(0, Math.min(dataIndex, miniChartData.length - 1));
    const dataPoint = miniChartData[clampedIndex];

    if (dataPoint) {
      setHoverInfo({
        x: x,
        date: formatDateForTooltip(dataPoint.time).replace(/:00 (AM|PM)$/, ' $1'), // Shorter format
      });
    }
  }, []);

  const handleTimelineMouseLeave = useCallback(() => {
    setHoverInfo(null);
  }, []);

  // Get formatted dates for the range tooltips
  const startDate = useMemo(() => {
    const dataPoint = miniChartData[brushRange.startIndex];
    return dataPoint ? formatDateForTooltip(dataPoint.time) : "";
  }, [brushRange.startIndex]);

  const endDate = useMemo(() => {
    const dataPoint = miniChartData[brushRange.endIndex];
    return dataPoint ? formatDateForTooltip(dataPoint.time) : "";
  }, [brushRange.endIndex]);

  // Calculate tooltip positions (percentage-based)
  const startPosition = useMemo(() => {
    return (brushRange.startIndex / (miniChartData.length - 1)) * 100;
  }, [brushRange.startIndex]);

  const endPosition = useMemo(() => {
    return (brushRange.endIndex / (miniChartData.length - 1)) * 100;
  }, [brushRange.endIndex]);

  // Compute highlight areas for selected pens
  const highlightAreas = useMemo(() => {
    if (!selectedPenIds || selectedPenIds.size === 0) return [];
    return Array.from(selectedPenIds)
      .map((penId) => {
        const mapping = penToChartMap[penId];
        if (!mapping) return null;
        const values = chartData.map((d) => d[mapping.dataKey as keyof typeof d] as number);
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        return { color: mapping.color, y1: minVal, y2: maxVal };
      })
      .filter(Boolean) as { color: string; y1: number; y2: number }[];
  }, [selectedPenIds]);

  // Check if range is not full (user has adjusted it)
  const isRangeAdjusted = brushRange.startIndex > 0 || brushRange.endIndex < 99;

  return (
    <div className={cn(className)}>
      {/* Main Chart */}
      <div
        ref={chartContainerRef}
        className={cn("h-75 md:h-87.5 overflow-x-auto relative", crosshairActive && "cursor-crosshair")}
        onMouseMove={crosshairActive ? handleChartMouseMove : undefined}
        onMouseLeave={crosshairActive ? handleChartMouseLeave : undefined}
      >
        <div className="min-w-[600px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 10 }}>
              <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" horizontal={true} vertical={false} />
              {highlightAreas.map((area, i) => (
                <ReferenceArea
                  key={i}
                  y1={area.y1}
                  y2={area.y2}
                  fill={area.color}
                  fillOpacity={0.1}
                  stroke="none"
                />
              ))}
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
                content={<CustomTooltip />}
                cursor={{ stroke: '#9ca3af', strokeDasharray: '5 5', strokeWidth: 1 }}
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

        {/* Horizontal crosshair line */}
        {crosshairActive && crosshairY !== null && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="0"
              y1={crosshairY}
              x2="100%"
              y2={crosshairY}
              stroke="#9ca3af"
              strokeDasharray="5 5"
              strokeWidth={1}
            />
          </svg>
        )}
      </div>

      {/* Timeline Section */}
      <div className="relative mt-2">
        {/* Range Tooltips - only show when dragging or range is adjusted */}
        {(isDragging || isRangeAdjusted) && (
          <div className="absolute -top-8 left-0 right-0 pointer-events-none z-10">
            {/* Start tooltip */}
            <div
              className="absolute -translate-x-1/2 bg-white border border-neutral-200 rounded px-2 py-1 text-xs text-neutral-700 shadow-md whitespace-nowrap"
              style={{ left: `${startPosition}%` }}
            >
              {startDate}
            </div>
            {/* End tooltip */}
            <div
              className="absolute -translate-x-1/2 bg-white border border-neutral-200 rounded px-2 py-1 text-xs text-neutral-700 shadow-md whitespace-nowrap"
              style={{ left: `${endPosition}%` }}
            >
              {endDate}
            </div>
          </div>
        )}

        {/* Hover tooltip */}
        {hoverInfo && !isDragging && (
          <div
            className="absolute -top-8 -translate-x-1/2 bg-white border border-neutral-200 rounded px-2 py-1 text-xs text-neutral-700 shadow-md whitespace-nowrap pointer-events-none z-20"
            style={{ left: hoverInfo.x }}
          >
            {hoverInfo.date}
          </div>
        )}

        {/* Mini Timeline with Brush */}
        <div
          ref={timelineRef}
          className="h-8 cursor-crosshair relative"
          onMouseMove={handleTimelineMouseMove}
          onMouseLeave={handleTimelineMouseLeave}
          onMouseUp={handleMouseUp}
        >
          {/* Base background */}
          <div className="absolute inset-0 bg-[#eef0fb] rounded-sm" />

          {/* Selection highlight overlay - only when range is adjusted */}
          {isRangeAdjusted && (
            <div
              className="absolute top-0 h-full bg-[#929BB0] pointer-events-none opacity-40"
              style={{
                left: `${startPosition}%`,
                width: `${endPosition - startPosition}%`,
              }}
            />
          )}

          {/* Brush with transparent fill so backgrounds show through */}
          <div className="absolute inset-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Brush
                  dataKey="index"
                  height={32}
                  stroke="transparent"
                  fill="transparent"
                  startIndex={brushRange.startIndex}
                  endIndex={brushRange.endIndex}
                  onChange={handleBrushChange}
                  traveller={SmartTraveller}
                  travellerWidth={10}
                >
                  <LineChart data={miniChartData}>
                    <Line type="monotone" dataKey="y1" stroke="#3347be" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="y2" stroke="#22c55e" strokeWidth={3} dot={false} />
                  </LineChart>
                </Brush>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
