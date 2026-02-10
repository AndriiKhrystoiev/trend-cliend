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
import { TagDetailModal } from "@/app/dashboard/components/tag-detail-modal";

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
  const [selectedTag, setSelectedTag] = useState<PenData | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

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
      {/* Desktop Table Header */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
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

      {/* Mobile Table Header */}
      <div className="md:hidden px-4 py-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Active Pens ({mockPensData.length})
        </h3>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedRows.size === mockPensData.length}
            onCheckedChange={toggleAllSelection}
          />
          <Button
            variant="default"
            className="bg-secondary-700 hover:bg-secondary-800 flex-1"
          >
            Clear
          </Button>
        </div>
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
                    <button
                      className="hover:underline cursor-pointer text-left"
                      onClick={() => {
                        setSelectedTag(pen);
                        setIsTagModalOpen(true);
                      }}
                    >
                      {pen.tagName}
                    </button>
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
        <div className="md:hidden px-4">
          {mockPensData.map((pen) => {
            const isExpanded = expandedRows.has(pen.id);
            return (
              <div key={pen.id} className="border border-neutral-100 rounded-lg bg-neutral-25 p-4 mb-3">
                <div className="flex flex-col gap-4 items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Checkbox
                      checked={selectedRows.has(pen.id)}
                      onCheckedChange={() => toggleSelection(pen.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <button
                        className="font-medium text-sm text-primary-500 break-words hover:underline cursor-pointer text-left"
                        onClick={() => {
                          setSelectedTag(pen);
                          setIsTagModalOpen(true);
                        }}
                      >
                        {pen.tagName}
                      </button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => toggleRow(pen.id)}
                    className="text-neutral-400 shrink-0 w-full"
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
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <span className="text-base-700 block mb-1 font-semibold">Server</span>
                      <span className="text-neutral-700 break-all">{pen.server}</span>
                    </div>
                    <div>
                      <span className="text-base-700 block mb-1 font-semibold">I/O</span>
                      <span className="text-neutral-700 break-all">{pen.io}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-700 font-semibold">Min</span>
                      <span className="text-neutral-700">{pen.min}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-700 font-semibold">Max</span>
                      <span className="text-neutral-700">{pen.max}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-700 font-semibold  ">Avg</span>
                      <span className="text-neutral-700">{pen.avg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-700 font-semibold">Stdev</span>
                      <span className="text-neutral-700">{pen.stdev}</span>
                    </div>
                    
                    {/* Controls section */}
                    <div className="pt-3 space-y-3">
                      {/* Dropdowns row */}
                      <div className="flex items-center gap-2">
                        <Select defaultValue={pen.weight}>
                          <SelectTrigger size="sm" className="h-10 flex-1 border-neutral-100 bg-white rounded">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1px">1px</SelectItem>
                            <SelectItem value="2px">2px</SelectItem>
                            <SelectItem value="3px">3px</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select defaultValue="solid">
                          <SelectTrigger size="sm" className="h-10 flex-1 border-neutral-100 bg-white rounded">
                            <SelectValue placeholder="—" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solid">—</SelectItem>
                            <SelectItem value="dashed">---</SelectItem>
                            <SelectItem value="dotted">...</SelectItem>
                          </SelectContent>
                        </Select>

                        <ColorPicker
                          color={penColors[pen.id] || pen.color}
                          onChange={(newColor) => handleColorChange(pen.id, newColor)}
                          className="w-8 h-8"
                        />
                      </div>

                      {/* Buttons row */}
                      <div className="flex gap-2 flex-col">
                        <div className="flex items-center gap-2">
                          <ToolbarButtonGroup className="flex-1">
                            <ToolbarButtonGroupItem className="flex-1 justify-center w-10">A</ToolbarButtonGroupItem>
                            <ToolbarButtonGroupItem className="flex-1 justify-center w-10">M</ToolbarButtonGroupItem>
                          </ToolbarButtonGroup>

                          <ToolbarButton className="w-10">
                            L
                          </ToolbarButton>
                        </div>
                        <div className="flex items-center gap-2">
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
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tag Detail Modal */}
      <TagDetailModal
        open={isTagModalOpen}
        onOpenChange={setIsTagModalOpen}
        tag={selectedTag}
      />
    </div>
  );
}
