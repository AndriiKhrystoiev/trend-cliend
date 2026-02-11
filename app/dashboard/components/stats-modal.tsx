"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StatRow {
  id: string;
  tagName: string;
  description: string;
  min: number;
  max: number;
  avg: number;
  stdev: number;
}

const mockStatsData: StatRow[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  tagName: "SC_CasterMoldWidth",
  description: "Slab Caster Mold Width",
  min: 3000,
  max: 3000,
  avg: 3000,
  stdev: 3000,
}));

interface StatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StatsModal({ open, onOpenChange }: StatsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[900px] p-6 gap-0 overflow-hidden"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-5">
          <DialogTitle className="text-xl font-semibold text-neutral-900">
            Statistics tags
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </DialogHeader>

        {/* Table */}
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <Table className="min-w-150">
            <TableHeader className="bg-base-50 sticky top-0 z-10">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-base-700 font-semibold">
                  Tag name
                </TableHead>
                <TableHead className="text-base-700 font-semibold">
                  Description
                </TableHead>
                <TableHead className="text-base-700 font-semibold">
                  Min
                </TableHead>
                <TableHead className="text-base-700 font-semibold">
                  Max
                </TableHead>
                <TableHead className="text-base-700 font-semibold">
                  Avg.
                </TableHead>
                <TableHead className="text-base-700 font-semibold">
                  Std.
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStatsData.map((stat) => (
                <TableRow
                  key={stat.id}
                  className="border-none hover:bg-neutral-25"
                >
                  <TableCell className="py-3">
                    <span className="text-sm font-medium text-primary-500">
                      {stat.tagName}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-400 py-3">
                    {stat.description}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-900 py-3">
                    {stat.min}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-900 py-3">
                    {stat.max}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-900 py-3">
                    {stat.avg}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-900 py-3">
                    {stat.stdev}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </DialogContent>
    </Dialog>
  );
}
