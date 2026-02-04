"use client";

import {
  Calendar,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Move,
  MousePointer,
  Crosshair,
  TrendingUp,
  Scissors,
  Eraser,
  Copy,
  FileText,
  Play,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        "size-8 bg-[#f8f9fc] border-[#ebedf6] rounded",
        active
          ? "bg-[#eef0fb] border-[#3347be] text-[#3347be]"
          : "text-[#57637b] hover:bg-[#f3f4f6]",
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
        "flex items-center gap-1 p-2 rounded-sm border",
        variant === "primary"
          ? "bg-[#f3f4fb] border-[#e7e9f7]"
          : "bg-[#ebedf6] border-[#ebedf6]"
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
        <p className="text-xl font-semibold text-[#101828] whitespace-nowrap">
          {dateRange}
        </p>
      </div>

      {/* Date Picker & Time Range Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<Calendar className="size-4" />} />
        <Select defaultValue="1hour">
          <SelectTrigger className="h-8 w-auto gap-2 bg-[#f8f9fc] border-[#ebedf6] text-sm text-[#57637b] rounded">
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
        <ToolbarButton icon={<Maximize2 className="size-4" />} />
        <ToolbarButton icon={<RotateCcw className="size-4" />} />
      </ToolbarGroup>

      {/* Pointer Tools Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<Move className="size-4" />} />
        <ToolbarButton icon={<MousePointer className="size-4" />} />
        <ToolbarButton icon={<Crosshair className="size-4" />} />
        <ToolbarButton icon={<TrendingUp className="size-4" />} />
      </ToolbarGroup>

      {/* Edit Tools Group (neutral variant) */}
      <ToolbarGroup variant="neutral">
        <ToolbarButton icon={<Scissors className="size-4" />} />
        <ToolbarButton icon={<Eraser className="size-4" />} />
        <ToolbarButton icon={<MousePointer className="size-4" />} />
        <ToolbarButton icon={<TrendingUp className="size-4" />} />
      </ToolbarGroup>

      {/* Export & Actions Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<Copy className="size-4" />} />
        <ToolbarButton icon={<FileText className="size-4" />} />
        <ToolbarButton icon={<Play className="size-4" />} />
      </ToolbarGroup>

      {/* List View Group */}
      <ToolbarGroup>
        <ToolbarButton icon={<List className="size-4" />} />
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
        <SelectTrigger className="h-10 w-full border-[#ebedf6] bg-[#f8f9fc] text-sm text-[#57637b]">
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
        <ToolbarButton icon={<Maximize2 className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<TrendingUp className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<RotateCcw className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Move className="size-4" />} className="w-full h-10" />
      </div>

      <div className="h-px bg-[#ebedf6]" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<Scissors className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Copy className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Eraser className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<FileText className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<MousePointer className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<Play className="size-4" />} className="w-full h-10" />
        <ToolbarButton icon={<TrendingUp className="size-4" />} className="w-full h-10" />
      </div>

      <div className="h-px bg-[#ebedf6]" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<List className="size-4" />} className="w-full h-10" />
      </div>
    </div>
  );
}
