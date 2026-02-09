"use client";

import {
  Calendar,
  MousePointer,
  Crosshair,
  TrendingUp,
  Copy,
  FileText,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChartGrowDown,
  ChartGrowDown2,
  ChartGrowUp,
  ChartGrowUp2,
  ChartPie,
  ChartRefresh,
  ChartRefresh2,
  DocumentText,
  Frame,
  Frame2,
  Maximize,
  Refresh,
  ZoomIn,
  ZoomOut
} from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimeRangePicker } from "@/components/ui/date-time-range-picker";
import { ChartActionsMenu } from "./chart-actions-menu";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

function ToolbarButton({ icon, active, onClick, className }: ToolbarButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={cn(
        "size-8 bg-neutral-25 border-neutral-50 rounded",
        active
          ? "bg-primary-25 border-primary-500 text-primary-500"
          : "text-neutral-600 hover:bg-neutral-50",
        className
      )}
    >
      {icon}
    </Button>
  );
}

interface ToolbarGroupProps {
  children: React.ReactNode;
  variant?: "primary" | "neutral";
}

function ToolbarGroup({ children, variant = "primary" }: ToolbarGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-2 rounded-xs border",
        variant === "primary"
          ? "bg-primary-25 border-primary-25"
          : "bg-neutral-50 border-neutral-50"
      )}
    >
      {children}
    </div>
  );
}

interface ChartToolbarProps {
  dateRange?: string;
  className?: string;
}

export function ChartToolbar({ dateRange = "09/14/2025 14:00 - 09/14/2025 21:00", className }: ChartToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Date Range Text */}
      <div className="flex-1 min-w-0">
        <p className="text-xl font-semibold text-neutral-900 whitespace-nowrap">
          {dateRange}
        </p>
      </div>

      {/* Date Picker & Time Range Group */}
      <ToolbarGroup>
        <DateTimeRangePicker />
        <Select defaultValue="1hour">
          <SelectTrigger size="sm" className="h-8 w-auto gap-2 bg-neutral-25 border-neutral-50 text-sm text-neutral-600 rounded">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15min">15 min</SelectItem>
            <SelectItem value="30min">30 min</SelectItem>
            <SelectItem value="1hour">1 hour</SelectItem>
            <SelectItem value="4hour">4 hours</SelectItem>
            <SelectItem value="1day">1 day</SelectItem>
          </SelectContent>
        </Select>
      </ToolbarGroup>

      {/* Zoom Controls Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<ZoomIn className="size-4" />} />
        <ToolbarButton icon={<ZoomOut className="size-4" />} />
        <ToolbarButton icon={<Maximize className="size-4" />} />
        <ToolbarButton icon={<Refresh className="size-4" />} />
      </ToolbarGroup>

      {/* Pointer Tools Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<ChartRefresh className="size-4" />} />
        <ToolbarButton icon={<Frame className="size-4" />} />
        <ToolbarButton icon={<ChartGrowUp className="size-4" />} />
        <ToolbarButton icon={<ChartGrowDown className="size-4" />} />
      </ToolbarGroup>

      {/* Edit Tools Group (neutral variant) */}
      <ToolbarGroup>
        <ToolbarButton icon={<ChartRefresh2 className="size-4" />} />
        <ToolbarButton icon={<Frame2 className="size-4" />} />
        <ToolbarButton icon={<ChartGrowUp2 className="size-4" />} />
        <ToolbarButton icon={<ChartGrowDown2 className="size-4" />} />
      </ToolbarGroup>

      {/* Export & Actions Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<ChartPie className="size-4" />} />
        <ToolbarButton icon={<DocumentText className="size-4" />} />
        <ToolbarButton icon={<Play className="size-4" />} />
      </ToolbarGroup>

      {/* List View Group */}
      <ToolbarGroup>
        <ChartActionsMenu />
      </ToolbarGroup>
    </div>
  );
}

// Mobile version - vertical toolbar in a sheet
export function MobileToolbar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 p-4 bg-white", className)}>
      {/* Date Picker */}
      <ToolbarButton icon={<Calendar className="size-4" />} className="w-full justify-center h-10" />

      {/* Time Range */}
      <Select defaultValue="1hour">
        <SelectTrigger className="h-10 w-full border-neutral-50 bg-neutral-25 text-sm text-neutral-600">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15min">15 min</SelectItem>
          <SelectItem value="30min">30 min</SelectItem>
          <SelectItem value="1hour">1 hour</SelectItem>
          <SelectItem value="4hour">4 hours</SelectItem>
          <SelectItem value="1day">1 day</SelectItem>
        </SelectContent>
      </Select>

      {/* Tool Groups */}
      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<ZoomIn className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<MousePointer className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<ZoomOut className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Crosshair className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Maximize className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<TrendingUp className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Refresh className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<ChartRefresh className="size-4" />} className="w-full h-10" />
      </div>

      <div className="h-px bg-neutral-50" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<ChartRefresh2 className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Copy className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Frame2 className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<FileText className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<MousePointer className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Play className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<TrendingUp className="size-4" />} className="w-full h-10" />
      </div>

      <div className="h-px bg-neutral-50" />

      <div className="grid grid-cols-2 gap-2">
        <ChartActionsMenu className="w-full h-10" />
      </div>
    </div>
  );
}
