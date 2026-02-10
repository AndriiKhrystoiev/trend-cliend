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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DateTimeRangePicker } from "@/components/ui/date-time-range-picker";
import { ChartActionsMenu } from "./chart-actions-menu";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}

function ToolbarButton({ icon, active, onClick, className, tooltip }: ToolbarButtonProps) {
  const button = (
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

  if (!tooltip) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
      <div className="flex-1 min-w-sm">
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
        <ToolbarButton icon={<ZoomIn className="size-4" />} tooltip="Zoom In" />
        <ToolbarButton icon={<ZoomOut className="size-4" />} tooltip="Zoom Out" />
        <ToolbarButton icon={<Maximize className="size-4" />} tooltip="Rubber Band Scaling" />
        <ToolbarButton icon={<Refresh className="size-4" />} tooltip="Reset zoom" />
      </ToolbarGroup>

      {/* Pointer Tools Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<ChartRefresh className="size-4" />} tooltip="Scale current tag to its original scale" />
        <ToolbarButton icon={<Frame className="size-4" />} tooltip="Auto scale the current tag" />
        <ToolbarButton icon={<ChartGrowUp className="size-4" />} tooltip="Scale tag up" />
        <ToolbarButton icon={<ChartGrowDown className="size-4" />} tooltip="Scale tag down" />
      </ToolbarGroup>

      {/* Edit Tools Group (neutral variant) */}
      <ToolbarGroup>
        <ToolbarButton icon={<ChartRefresh2 className="size-4" />} tooltip="Scale current tag to its original scale" />
        <ToolbarButton icon={<Frame2 className="size-4" />} tooltip="Auto scale the current tag" />
        <ToolbarButton icon={<ChartGrowUp2 className="size-4" />} tooltip="Scale tag up" />
        <ToolbarButton icon={<ChartGrowDown2 className="size-4" />} tooltip="Scale tag down" />
      </ToolbarGroup>

      {/* Export & Actions Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<ChartPie className="size-4" />} tooltip="Show Stats" />
        <ToolbarButton icon={<DocumentText className="size-4" />} tooltip="Show Annotations" />
        <ToolbarButton icon={<Play className="size-4" />} tooltip="Live" />
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
    <div className={cn("flex flex-col gap-2 pt-2 bg-primary-25", className)}>
      {/* Date Picker & Time Range Group */}
      <div className="flex flex-col gap-2 p-2 mx-2 bg-neutral-50 rounded w-26">
        <ToolbarButton icon={<Calendar className="size-4" />} className="w-8 justify-center h-8" />
        <Select defaultValue="1hour">
          <SelectTrigger className="h-10 w-22 border-neutral-50 bg-white text-sm text-neutral-600">
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
      </div>

      {/* Zoom Controls Group */}
      <div className="flex justify-center gap-2">
        <div className="flex flex-col items-center bg-neutral-50 rounded gap-2 p-2 w-12">
          <ToolbarButton icon={<ZoomIn className="size-4" />} className="w-8 h-8" tooltip="Zoom In" />
          <ToolbarButton icon={<ZoomOut className="size-4" />} className="w-8 h-8" tooltip="Zoom Out" />
          <ToolbarButton icon={<Maximize className="size-4" />} className="w-8 h-8" tooltip="Rubber Band Scaling" />
          <ToolbarButton icon={<Refresh className="size-4" />} className="w-8 h-8" tooltip="Reset zoom" />
        </div>
        <div className="flex flex-col items-center bg-neutral-50 rounded gap-2 p-2 w-12">
          <ToolbarButton icon={<ChartRefresh className="size-4" />} className="w-8 h-8" tooltip="Scale current tag to its original scale" />
          <ToolbarButton icon={<Frame className="size-4" />} className="w-8 h-8" tooltip="Auto scale the current tag" />
          <ToolbarButton icon={<ChartGrowUp className="size-4" />} className="w-8 h-8" tooltip="Scale tag up" />
          <ToolbarButton icon={<ChartGrowDown className="size-4" />} className="w-8 h-8" tooltip="Scale tag down" />
        </div>
      </div>

      {/* Edit Tools Group */}
      <div className="flex justify-center items-baseline gap-2">
        <div className="flex flex-col items-center bg-neutral-50 rounded gap-2 p-2 w-12">
          <ToolbarButton icon={<ChartRefresh2 className="size-4" />} className="w-8 h-8" tooltip="Scale current tag to its original scale" />
          <ToolbarButton icon={<Frame2 className="size-4" />} className="w-8 h-8" tooltip="Auto scale the current tag" />
          <ToolbarButton icon={<ChartGrowUp2 className="size-4" />} className="w-8 h-8" tooltip="Scale tag up" />
          <ToolbarButton icon={<ChartGrowDown2 className="size-4" />} className="w-8 h-8" tooltip="Scale tag down" />
        </div>
        <div className="flex flex-col items-center bg-neutral-50 rounded gap-2 p-2 w-12">
          <ToolbarButton icon={<ChartPie className="size-4" />} className="w-8 h-8" tooltip="Show Annotations" />
          <ToolbarButton icon={<DocumentText className="size-4" />} className="w-8 h-8" tooltip="Show Stats" />
          <ToolbarButton icon={<Play className="size-4" />} className="w-8 h-8" tooltip="Live" />
        </div>
      </div>

      {/* Actions Menu Group */}
      <div className="p-2 mx-2 bg-neutral-50 rounded w-12">
        <ChartActionsMenu />
      </div>
    </div>
  );
}
