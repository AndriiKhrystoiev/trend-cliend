"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExportTrendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportTrendModal({ open, onOpenChange }: ExportTrendModalProps) {
  const [format, setFormat] = useState<string>("");

  const handleExport = () => {
    if (!format) return;
    onOpenChange(false);
    setFormat("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-116 p-6 gap-0">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-1">
          <DialogTitle className="text-xl font-semibold text-neutral-900">
            Export
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </DialogHeader>

        {/* Description */}
        <p className="text-sm text-neutral-400 mb-5">
          Select or create a folder to save the trend
        </p>

        {/* Format Select */}
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm font-semibold text-neutral-700">Format</label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="h-10 border-neutral-100 rounded-sm">
              <SelectValue placeholder="Change format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export Button */}
        <Button
          variant="default"
          size="lg"
          onClick={handleExport}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white text-base"
        >
          Export
        </Button>
      </DialogContent>
    </Dialog>
  );
}
