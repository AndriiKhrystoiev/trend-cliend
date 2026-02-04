"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Eye, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
    <Card className={cn("border-[#e5e7eb]", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-[#e5e7eb] px-4 py-3">
        <CardTitle className="text-lg font-semibold text-[#242a37]">
          Active Pens ({mockPensData.length})
        </CardTitle>
        <Button
          variant="default"
          className="bg-[#3347be] hover:bg-[#2335a8]"
        >
          Clear
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#e5e7eb] hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.size === mockPensData.length}
                    onCheckedChange={toggleAllSelection}
                  />
                </TableHead>
                <TableHead className="text-[#6a7282]">Tag name</TableHead>
                <TableHead className="text-[#6a7282]">Description</TableHead>
                <TableHead className="text-[#6a7282]">Server</TableHead>
                <TableHead className="text-[#6a7282]">I/O</TableHead>
                <TableHead className="text-center text-[#6a7282]">Min</TableHead>
                <TableHead className="text-center text-[#6a7282]">Max</TableHead>
                <TableHead className="text-center text-[#6a7282]">Avg</TableHead>
                <TableHead className="text-center text-[#6a7282]">Stdev</TableHead>
                <TableHead className="text-[#6a7282]">Weight</TableHead>
                <TableHead className="text-[#6a7282]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPensData.map((pen) => (
                <TableRow
                  key={pen.id}
                  className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(pen.id)}
                      onCheckedChange={() => toggleSelection(pen.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-[#3347be]">
                    {pen.tagName}
                  </TableCell>
                  <TableCell className="text-[#6a7282]">{pen.description}</TableCell>
                  <TableCell className="text-[#6a7282]">{pen.server}</TableCell>
                  <TableCell className="text-[#6a7282]">{pen.io}</TableCell>
                  <TableCell className="text-center text-[#242a37]">{pen.min}</TableCell>
                  <TableCell className="text-center text-[#242a37]">{pen.max}</TableCell>
                  <TableCell className="text-center text-[#242a37]">{pen.avg}</TableCell>
                  <TableCell className="text-center text-[#242a37]">{pen.stdev}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-4 rounded"
                        style={{ backgroundColor: pen.color }}
                      />
                      <Select defaultValue={pen.weight}>
                        <SelectTrigger className="h-8 w-20 border-[#e5e7eb]">
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
                    <div className="flex items-center gap-1">
                      <Select defaultValue="solid">
                        <SelectTrigger className="h-8 w-16 border-[#e5e7eb]">
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">—</SelectItem>
                          <SelectItem value="dashed">- -</SelectItem>
                          <SelectItem value="dotted">...</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <span className="text-xs">A</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <span className="text-xs">M</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <span className="text-xs">L</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <Plus className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <Trash2 className="size-4" />
                      </Button>
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
              <div key={pen.id} className="border-b border-[#e5e7eb] p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedRows.has(pen.id)}
                      onCheckedChange={() => toggleSelection(pen.id)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-sm text-[#3347be]">{pen.tagName}</p>
                      <p className="text-xs text-[#6a7282]">{pen.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(pen.id)}
                    className="text-[#6a7282]"
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
                        <div
                          className="size-4 rounded"
                          style={{ backgroundColor: pen.color }}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="secondary" size="sm" className="h-7 px-2 text-xs">
                          A
                        </Button>
                        <Button variant="secondary" size="sm" className="h-7 px-2 text-xs">
                          M
                        </Button>
                        <Button variant="secondary" size="sm" className="h-7 px-2 text-xs">
                          L
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <Eye className="size-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <Plus className="size-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-[#6a7282]">
                        <Trash2 className="size-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
