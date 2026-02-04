"use client";

import {
  Calendar,
  ChevronDown,
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

interface ToolbarButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

function ToolbarButton({ icon, active, onClick, className }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg border border-[#e5e7eb] transition-colors",
        active ? "bg-[#eef0fb] border-[#3347be] text-[#3347be]" : "bg-white text-[#6a7282] hover:bg-[#f9fafb]",
        className
      )}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="h-10 w-px bg-[#e5e7eb]" />;
}

interface ChartToolbarProps {
  dateRange?: string;
  className?: string;
}

export function ChartToolbar({ dateRange = "09/14/2025 14:00 - 09/14/2025 21:00", className }: ChartToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Date Range */}
      <div className="text-sm font-medium text-[#242a37] mr-2">{dateRange}</div>

      {/* Date Picker & Time Range */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Calendar className="size-5" />} />
        <button className="flex h-10 items-center gap-1 rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#242a37] hover:bg-[#f9fafb]">
          <span>1 hour</span>
          <ChevronDown className="size-4 text-[#6a7282]" />
        </button>
      </div>

      <ToolbarDivider />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<ZoomIn className="size-5" />} />
        <ToolbarButton icon={<ZoomOut className="size-5" />} />
        <ToolbarButton icon={<Maximize2 className="size-5" />} />
        <ToolbarButton icon={<RotateCcw className="size-5" />} />
      </div>

      <ToolbarDivider />

      {/* Pointer Tools */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Move className="size-5" />} />
        <ToolbarButton icon={<MousePointer className="size-5" />} />
        <ToolbarButton icon={<Crosshair className="size-5" />} active />
        <ToolbarButton icon={<TrendingUp className="size-5" />} />
      </div>

      <ToolbarDivider />

      {/* Edit Tools */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Scissors className="size-5" />} />
        <ToolbarButton icon={<Eraser className="size-5" />} />
        <ToolbarButton icon={<MousePointer className="size-5" />} />
        <ToolbarButton icon={<TrendingUp className="size-5" />} />
      </div>

      <ToolbarDivider />

      {/* Export & Actions */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Copy className="size-5" />} />
        <ToolbarButton icon={<FileText className="size-5" />} />
        <ToolbarButton icon={<Play className="size-5" />} />
      </div>

      <ToolbarDivider />

      {/* List View */}
      <ToolbarButton icon={<List className="size-5" />} />
    </div>
  );
}

// Mobile version - vertical toolbar in a sheet
export function MobileToolbar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 p-4 bg-white", className)}>
      {/* Date Picker */}
      <ToolbarButton icon={<Calendar className="size-5" />} className="w-full justify-center" />

      {/* Time Range */}
      <button className="flex h-10 items-center justify-center gap-1 rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#242a37]">
        <span>1 hour</span>
        <ChevronDown className="size-4 text-[#6a7282]" />
      </button>

      {/* Tool Groups */}
      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<ZoomIn className="size-5" />} className="w-full" />
        <ToolbarButton icon={<MousePointer className="size-5" />} className="w-full" />
        <ToolbarButton icon={<ZoomOut className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Crosshair className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Maximize2 className="size-5" />} className="w-full" />
        <ToolbarButton icon={<TrendingUp className="size-5" />} className="w-full" />
        <ToolbarButton icon={<RotateCcw className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Move className="size-5" />} className="w-full" />
      </div>

      <div className="h-px bg-[#e5e7eb]" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<Scissors className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Copy className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Eraser className="size-5" />} className="w-full" />
        <ToolbarButton icon={<FileText className="size-5" />} className="w-full" />
        <ToolbarButton icon={<MousePointer className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Play className="size-5" />} className="w-full" />
        <ToolbarButton icon={<TrendingUp className="size-5" />} className="w-full" />
      </div>

      <div className="h-px bg-[#e5e7eb]" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<List className="size-5" />} className="w-full" />
      </div>
    </div>
  );
}
