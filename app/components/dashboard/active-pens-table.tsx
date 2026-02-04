"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PenData {
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

const mockPensData: PenData[] = [
  {
    id: "1",
    tagName: "SC_CasterMold...",
    description: "Slab Caster...",
    server: "10.1.16.10.1.16...",
    io: "\\\\178.200.1.2...",
    min: 2,
    max: 2,
    avg: 2,
    stdev: 2,
    color: "#22c55e",
    weight: "1px",
  },
  {
    id: "2",
    tagName: "SC_CasterMold...",
    description: "Slab Caster...",
    server: "10.1.1610.1.16...",
    io: "\\\\178.200.1.2...",
    min: 2,
    max: 2,
    avg: 2,
    stdev: 2,
    color: "#3347be",
    weight: "1px",
  },
];

interface ActivePensTableProps {
  className?: string;
}

export function ActivePensTable({ className }: ActivePensTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("bg-white rounded-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb]">
        <h3 className="text-lg font-semibold text-[#242a37]">Active Pens (2)</h3>
        <button className="rounded-lg bg-[#3347be] px-4 py-2 text-sm font-medium text-white hover:bg-[#2335a8]">
          Clear
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-left text-sm text-[#6a7282]">
              <th className="px-4 py-3 font-medium">
                <input type="checkbox" className="size-4 rounded border-[#ced4e0]" />
              </th>
              <th className="px-4 py-3 font-medium">Tag name</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Server</th>
              <th className="px-4 py-3 font-medium">I/O</th>
              <th className="px-4 py-3 font-medium text-center">Min</th>
              <th className="px-4 py-3 font-medium text-center">Max</th>
              <th className="px-4 py-3 font-medium text-center">Avg</th>
              <th className="px-4 py-3 font-medium text-center">Stdev</th>
              <th className="px-4 py-3 font-medium">Weight</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockPensData.map((pen) => (
              <tr key={pen.id} className="border-b border-[#e5e7eb] text-sm hover:bg-[#f9fafb]">
                <td className="px-4 py-3">
                  <input type="checkbox" className="size-4 rounded border-[#ced4e0]" />
                </td>
                <td className="px-4 py-3 text-[#3347be] font-medium">{pen.tagName}</td>
                <td className="px-4 py-3 text-[#6a7282]">{pen.description}</td>
                <td className="px-4 py-3 text-[#6a7282]">{pen.server}</td>
                <td className="px-4 py-3 text-[#6a7282]">{pen.io}</td>
                <td className="px-4 py-3 text-center text-[#242a37]">{pen.min}</td>
                <td className="px-4 py-3 text-center text-[#242a37]">{pen.max}</td>
                <td className="px-4 py-3 text-center text-[#242a37]">{pen.avg}</td>
                <td className="px-4 py-3 text-center text-[#242a37]">{pen.stdev}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded"
                      style={{ backgroundColor: pen.color }}
                    />
                    <span className="text-[#6a7282]">{pen.weight}</span>
                    <ChevronDown className="size-4 text-[#6a7282]" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="text-xs px-2 py-1 text-[#6a7282] hover:bg-[#f3f4f6] rounded">—</button>
                    <ChevronDown className="size-4 text-[#6a7282]" />
                    <button className="text-xs px-2 py-1 text-[#6a7282] hover:bg-[#f3f4f6] rounded">A</button>
                    <button className="text-xs px-2 py-1 text-[#6a7282] hover:bg-[#f3f4f6] rounded">M</button>
                    <button className="text-xs px-2 py-1 text-[#6a7282] hover:bg-[#f3f4f6] rounded">L</button>
                    <Eye className="size-4 text-[#6a7282] ml-1" />
                    <Plus className="size-4 text-[#6a7282]" />
                    <Trash2 className="size-4 text-[#6a7282]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {mockPensData.map((pen) => {
          const isExpanded = expandedRows.has(pen.id);
          return (
            <div key={pen.id} className="border-b border-[#e5e7eb] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 size-4 rounded border-[#ced4e0]" />
                  <div>
                    <p className="text-[#3347be] font-medium text-sm">{pen.tagName}</p>
                    <p className="text-xs text-[#6a7282]">{pen.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRow(pen.id)}
                  className="flex items-center gap-1 text-sm text-[#6a7282]"
                >
                  Details
                  {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">Server</span>
                    <span className="text-[#242a37]">{pen.server}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">I/O</span>
                    <span className="text-[#242a37]">{pen.io}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">Min</span>
                    <span className="text-[#242a37]">{pen.min}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">Max</span>
                    <span className="text-[#242a37]">{pen.max}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">Avg</span>
                    <span className="text-[#242a37]">{pen.avg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6a7282]">Stdev</span>
                    <span className="text-[#242a37]">{pen.stdev}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#6a7282]">{pen.weight}</span>
                      <ChevronDown className="size-4 text-[#6a7282]" />
                      <div
                        className="size-4 rounded"
                        style={{ backgroundColor: pen.color }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs px-2 py-1 bg-[#f3f4f6] rounded">A</button>
                      <button className="text-xs px-2 py-1 bg-[#f3f4f6] rounded">M</button>
                      <button className="text-xs px-2 py-1 bg-[#f3f4f6] rounded">L</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Eye className="size-5 text-[#6a7282]" />
                    <Plus className="size-5 text-[#6a7282]" />
                    <Trash2 className="size-5 text-[#6a7282]" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
