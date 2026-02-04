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
import { Separator } from "@/components/ui/separator";

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
        "size-10 border-[#e5e7eb]",
        active
          ? "bg-[#eef0fb] border-[#3347be] text-[#3347be]"
          : "bg-white text-[#6a7282] hover:bg-[#f9fafb]",
        className
      )}
    >
      {icon}
    </Button>
  );
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
        <Select defaultValue="1hour">
          <SelectTrigger className="h-10 w-auto gap-1 border-[#e5e7eb] bg-white text-sm text-[#242a37] hover:bg-[#f9fafb]">
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

      <Separator orientation="vertical" className="h-10 bg-[#e5e7eb]" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<ZoomIn className="size-5" />} />
        <ToolbarButton icon={<ZoomOut className="size-5" />} />
        <ToolbarButton icon={<Maximize2 className="size-5" />} />
        <ToolbarButton icon={<RotateCcw className="size-5" />} />
      </div>

      <Separator orientation="vertical" className="h-10 bg-[#e5e7eb]" />

      {/* Pointer Tools */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Move className="size-5" />} />
        <ToolbarButton icon={<MousePointer className="size-5" />} />
        <ToolbarButton icon={<Crosshair className="size-5" />} active />
        <ToolbarButton icon={<TrendingUp className="size-5" />} />
      </div>

      <Separator orientation="vertical" className="h-10 bg-[#e5e7eb]" />

      {/* Edit Tools */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Scissors className="size-5" />} />
        <ToolbarButton icon={<Eraser className="size-5" />} />
        <ToolbarButton icon={<MousePointer className="size-5" />} />
        <ToolbarButton icon={<TrendingUp className="size-5" />} />
      </div>

      <Separator orientation="vertical" className="h-10 bg-[#e5e7eb]" />

      {/* Export & Actions */}
      <div className="flex items-center gap-1">
        <ToolbarButton icon={<Copy className="size-5" />} />
        <ToolbarButton icon={<FileText className="size-5" />} />
        <ToolbarButton icon={<Play className="size-5" />} />
      </div>

      <Separator orientation="vertical" className="h-10 bg-[#e5e7eb]" />

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
      <Select defaultValue="1hour">
        <SelectTrigger className="h-10 w-full border-[#e5e7eb] bg-white text-sm text-[#242a37]">
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
        <ToolbarButton icon={<ZoomIn className="size-5" />} className="w-full" />
        <ToolbarButton icon={<MousePointer className="size-5" />} className="w-full" />
        <ToolbarButton icon={<ZoomOut className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Crosshair className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Maximize2 className="size-5" />} className="w-full" />
        <ToolbarButton icon={<TrendingUp className="size-5" />} className="w-full" />
        <ToolbarButton icon={<RotateCcw className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Move className="size-5" />} className="w-full" />
      </div>

      <Separator className="bg-[#e5e7eb]" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<Scissors className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Copy className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Eraser className="size-5" />} className="w-full" />
        <ToolbarButton icon={<FileText className="size-5" />} className="w-full" />
        <ToolbarButton icon={<MousePointer className="size-5" />} className="w-full" />
        <ToolbarButton icon={<Play className="size-5" />} className="w-full" />
        <ToolbarButton icon={<TrendingUp className="size-5" />} className="w-full" />
      </div>

      <Separator className="bg-[#e5e7eb]" />

      <div className="grid grid-cols-2 gap-2">
        <ToolbarButton icon={<List className="size-5" />} className="w-full" />
      </div>
    </div>
  );
}
