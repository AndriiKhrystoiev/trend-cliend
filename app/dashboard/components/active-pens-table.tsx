"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Plus, Trash } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  ToolbarButton,
  ToolbarButtonGroup,
  ToolbarButtonGroupItem,
} from "@/components/ui/toolbar-button";
import { ColorPicker } from "@/components/ui/color-picker";

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
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [penColors, setPenColors] = useState<Record<string, string>>(() =>
    mockPensData.reduce((acc, pen) => ({ ...acc, [pen.id]: pen.color }), {})
  );

  const handleColorChange = (penId: string, newColor: string) => {
    setPenColors((prev) => ({ ...prev, [penId]: newColor }));
  };

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

  const toggleSelection = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === mockPensData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(mockPensData.map((p) => p.id)));
    }
  };

  return (
    <div className={cn("border border-neutral-50 rounded-lg pb-4", className)}>
      {/* Table Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-lg font-semibold text-neutral-900">
          Active Pens ({mockPensData.length})
        </h3>
        <Button
          variant="default"
          className="bg-secondary-700 hover:bg-secondary-800 px-6"
        >
          Clear
        </Button>
      </div>

      <div className="p-0">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-base-50">
              <TableRow className="border-b border-neutral-100 bg-transparent hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.size === mockPensData.length}
                    onCheckedChange={toggleAllSelection}
                  />
                </TableHead>
                <TableHead className="text-base-700 font-semibold">Tag name</TableHead>
                <TableHead className="text-base-700 font-semibold">Description</TableHead>
                <TableHead className="text-base-700 font-semibold">Server</TableHead>
                <TableHead className="text-base-700 font-semibold">I/O</TableHead>
                <TableHead className="text-center text-base-700 font-semibold">Min</TableHead>
                <TableHead className="text-center text-base-700 font-semibold">Max</TableHead>
                <TableHead className="text-center text-base-700 font-semibold">Avg</TableHead>
                <TableHead className="text-center text-base-700 font-semibold">Stdev</TableHead>
                <TableHead className="text-base-700 font-semibold">Weight</TableHead>
                <TableHead className="text-base-700 font-semibold"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPensData.map((pen) => (
                <TableRow
                  key={pen.id}
                  className="border-b border-neutral-100 hover:bg-neutral-25"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(pen.id)}
                      onCheckedChange={() => toggleSelection(pen.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-primary-500">
                    {pen.tagName}
                  </TableCell>
                  <TableCell className="text-neutral-400">{pen.description}</TableCell>
                  <TableCell className="text-neutral-400">
                    <div className="flex items-center gap-1">
                      {pen.server}
                      <Info className="size-3.5 text-neutral-300 shrink-0" />
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-400">
                    <div className="flex items-center gap-1">
                      {pen.io}
                      <Info className="size-3.5 text-neutral-300 shrink-0" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-neutral-900">{pen.min}</TableCell>
                  <TableCell className="text-center text-neutral-900">{pen.max}</TableCell>
                  <TableCell className="text-center text-neutral-900">{pen.avg}</TableCell>
                  <TableCell className="text-center text-neutral-900">{pen.stdev}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ColorPicker
                        color={penColors[pen.id] || pen.color}
                        onChange={(newColor) => handleColorChange(pen.id, newColor)}
                      />
                      <Select defaultValue={pen.weight}>
                        <SelectTrigger size="sm" className="h-10 w-[70px] border-neutral-100 bg-neutral-25 rounded-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1px">1px</SelectItem>
                          <SelectItem value="2px">2px</SelectItem>
                          <SelectItem value="3px">3px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="solid">
                        <SelectTrigger size="sm" className="h-10 w-[70px] border-neutral-100 bg-neutral-25 rounded-sm mr-2">
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">—</SelectItem>
                          <SelectItem value="dashed">---</SelectItem>
                          <SelectItem value="dotted">...</SelectItem>
                        </SelectContent>
                      </Select>
                      <ToolbarButtonGroup>
                        <ToolbarButtonGroupItem disabled>A</ToolbarButtonGroupItem>
                        <ToolbarButtonGroupItem>M</ToolbarButtonGroupItem>
                      </ToolbarButtonGroup>
                      <ToolbarButton>
                        L
                      </ToolbarButton>
                      <ToolbarButton>
                        <Eye className="size-4" />
                      </ToolbarButton>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ToolbarButton>
                              <Plus className="size-4" />
                            </ToolbarButton>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Create a tag</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <ToolbarButton>
                        <Trash className="size-4" />
                      </ToolbarButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {mockPensData.map((pen) => {
            const isExpanded = expandedRows.has(pen.id);
            return (
              <div key={pen.id} className="border-b border-neutral-100 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedRows.has(pen.id)}
                      onCheckedChange={() => toggleSelection(pen.id)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-sm text-primary-500">{pen.tagName}</p>
                      <p className="text-xs text-neutral-400">{pen.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(pen.id)}
                    className="text-neutral-400"
                  >
                    Details
                    {isExpanded ? (
                      <ChevronUp className="ml-1 size-4" />
                    ) : (
                      <ChevronDown className="ml-1 size-4" />
                    )}
                  </Button>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Server</span>
                      <span className="text-neutral-900">{pen.server}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">I/O</span>
                      <span className="text-neutral-900">{pen.io}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Min</span>
                      <span className="text-neutral-900">{pen.min}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Max</span>
                      <span className="text-neutral-900">{pen.max}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Avg</span>
                      <span className="text-neutral-900">{pen.avg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Stdev</span>
                      <span className="text-neutral-900">{pen.stdev}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 pt-3">
                      {/* Weight dropdown */}
                      <Select defaultValue={pen.weight}>
                        <SelectTrigger size="sm" className="h-10 w-[100px] border-neutral-100 bg-white rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1px">1px</SelectItem>
                          <SelectItem value="2px">2px</SelectItem>
                          <SelectItem value="3px">3px</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Line style dropdown */}
                      <Select defaultValue="solid">
                        <SelectTrigger className="h-10 w-[90px] border-neutral-100 bg-white rounded-lg">
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">—</SelectItem>
                          <SelectItem value="dashed">---</SelectItem>
                          <SelectItem value="dotted">...</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* A/M/L button group */}
                      <ToolbarButtonGroup>
                        <ToolbarButtonGroupItem active>A</ToolbarButtonGroupItem>
                        <ToolbarButtonGroupItem>M</ToolbarButtonGroupItem>
                        <ToolbarButtonGroupItem>L</ToolbarButtonGroupItem>
                      </ToolbarButtonGroup>

                      {/* Action buttons */}
                      <ToolbarButton>
                        <Eye className="size-4" />
                      </ToolbarButton>
                      <ToolbarButton>
                        <Plus className="size-4" />
                      </ToolbarButton>
                      <ToolbarButton>
                        <Trash className="size-4" />
                      </ToolbarButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
