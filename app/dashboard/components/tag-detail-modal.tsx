"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TagDetailData {
  id: string;
  tagName: string;
  description: string;
  server: string;
  io: string;
  min: number;
  max: number;
  avg: number;
  stdev: number;
  color: string;
  weight: string;
}

interface TagDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: TagDetailData | null;
}

export function TagDetailModal({ open, onOpenChange, tag }: TagDetailModalProps) {
  if (!tag) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[464px] p-6 gap-0 overflow-hidden [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-5">
          <DialogTitle className="text-xl font-semibold text-neutral-900">
            Tag details
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </DialogHeader>

        {/* Form fields */}
        <div className="space-y-4 overflow-y-auto max-sm:max-h-[400px] pr-1">
          <Input label="Tag name" readOnly value={tag.tagName} size="lg" />
          <Input label="I/O" readOnly value={tag.io} size="lg"  />
          <Input label="Server" readOnly value={tag.server} size="lg" />

          {/* Stats row: Min, Max, Avg, Stdev */}
          <div className="grid grid-cols-4 gap-3">
            <Input label="Min" readOnly value={tag.min} size="lg" />
            <Input label="Max" readOnly value={tag.max} size="lg" />
            <Input label="Avg" readOnly value={tag.avg} size="lg" />
            <Input label="Stdev" readOnly value={tag.stdev} size="lg" />
          </div>

          {/* Weight, Style, Color row */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
            <Input label="Weight" readOnly value={tag.weight} size="lg" />
            <Input label="Style" readOnly value="Solid" size="lg" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700">Color</label>
              <div className="flex items-center justify-center px-2 py-2 border border-neutral-100 rounded-sm h-10">
                <div className="flex items-center justify-center p-0.5 border border-[#E5E7EB] rounded-sm">
                  <div
                    className="size-4 rounded"
                    style={{ backgroundColor: tag.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <Textarea label="Description" readOnly value={tag.description} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
