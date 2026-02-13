"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface Tag {
  id: string;
  name: string;
}

interface Process {
  id: string;
  name: string;
  timeRange: string;
  tags: Tag[];
}

const MOCK_PROCESSES: Process[] = [
  {
    id: "eaf",
    name: "EAF",
    timeRange: "09:00 – 09:45",
    tags: [
      { id: "eaf-temp", name: "EAF_Temperature" },
      { id: "eaf-pressure", name: "EAF_Pressure" },
    ],
  },
  {
    id: "eagh",
    name: "EAGH",
    timeRange: "10:00 – 10:35",
    tags: [
      { id: "eagh-temp", name: "EAGH_Temperature" },
      { id: "eagh-flow", name: "EAGH_Flow" },
    ],
  },
  {
    id: "easdfh21",
    name: "EASDFH21",
    timeRange: "11:00 – 11:30",
    tags: [
      { id: "easdfh21-temp", name: "EASDFH21_Temperature" },
      { id: "easdfh21-pressure", name: "EASDFH21_Pressure" },
    ],
  },
  {
    id: "eaf121",
    name: "EAF121",
    timeRange: "12:00 – 12:45",
    tags: [
      { id: "eaf121-speed", name: "EAF121_Speed" },
      { id: "eaf121-temp", name: "EAF121_Temperature" },
    ],
  },
  {
    id: "eaf87",
    name: "EAF87",
    timeRange: "12:50 – 13:45",
    tags: [
      { id: "eaf87-oxygen", name: "EAF_Oxygen" },
      { id: "eaf87-power", name: "EAF_Power" },
    ],
  },
  {
    id: "eaf22",
    name: "EAF22",
    timeRange: "14:00 – 14:45",
    tags: [
      { id: "eaf22-carbon", name: "EAF22_Carbon" },
      { id: "eaf22-temp", name: "EAF22_Temperature" },
    ],
  },
];

function ProcessItem({
  process,
  isSelected,
  selectedTagIds,
  onToggleProcess,
  onToggleTag,
}: {
  process: Process;
  isSelected: boolean;
  selectedTagIds: Set<string>;
  onToggleProcess: (id: string) => void;
  onToggleTag: (id: string) => void;
}) {
  return (
    <div className={cn("border-t border-neutral-100", isSelected && "bg-base-50")}>
      <button
        onClick={() => onToggleProcess(process.id)}
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-neutral-25 cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary-500">
            {process.name}
          </span>
          <span className="text-sm text-neutral-500">
            ({process.timeRange})
          </span>
        </div>
        {isSelected && <Check className="size-5 text-neutral-400" />}
      </button>

      {isSelected && (
        <div className="px-4 pb-3">
          <span className="text-xs font-medium text-neutral-500 mb-2 block">
            Select tags:
          </span>
          <div className="flex flex-wrap gap-2">
            {process.tags.map((tag) => (
              <label
                key={tag.id}
                className="inline-flex items-center gap-1.5 rounded border border-neutral-100 px-2 py-1.5 text-sm cursor-pointer hover:bg-neutral-25"
              >
                <Checkbox
                  checked={selectedTagIds.has(tag.id)}
                  onCheckedChange={() => onToggleTag(tag.id)}
                />
                <span className="text-neutral-500 font-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search",
  className,
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcessIds, setSelectedProcessIds] = useState<Set<string>>(new Set());
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorWidth, setAnchorWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      setAnchorWidth(anchorRef.current.offsetWidth);
    }
  }, [isOpen]);

  const selectedTags = useMemo(() => {
    const tags: Tag[] = [];
    for (const process of MOCK_PROCESSES) {
      for (const tag of process.tags) {
        if (selectedTagIds.has(tag.id)) {
          tags.push(tag);
        }
      }
    }
    return tags;
  }, [selectedTagIds]);

  const filteredProcesses = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_PROCESSES;
    const q = searchQuery.toLowerCase();
    return MOCK_PROCESSES.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const selectedCount = selectedProcessIds.size;

  const handleToggleProcess = (processId: string) => {
    setSelectedProcessIds((prev) => {
      const next = new Set(prev);
      if (next.has(processId)) {
        next.delete(processId);
        const process = MOCK_PROCESSES.find((p) => p.id === processId);
        if (process) {
          setSelectedTagIds((prevTags) => {
            const nextTags = new Set(prevTags);
            process.tags.forEach((tag) => nextTags.delete(tag.id));
            return nextTags;
          });
        }
      } else {
        next.add(processId);
      }
      return next;
    });
  };

  const handleToggleTag = (tagId: string) => {
    setSelectedTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTagIds((prev) => {
      const next = new Set(prev);
      next.delete(tagId);
      return next;
    });
  };

  const handleClearAll = () => {
    setSelectedProcessIds(new Set());
    setSelectedTagIds(new Set());
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverAnchor asChild>
        <div
          ref={anchorRef}
          className={cn(
            "flex items-center gap-2 rounded-sm border bg-white px-3.5 py-2 cursor-text",
            isOpen
              ? "border-primary-400 ring-[3px] ring-primary-100"
              : "border-neutral-100",
            className
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <Search className="size-5 shrink-0 text-neutral-400" />

          <div className="flex flex-1 items-center gap-1.5 flex-wrap min-w-0">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 rounded bg-white border border-neutral-100 px-2 py-0.5 text-sm text-neutral-700 whitespace-nowrap"
              >
                {tag.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(tag.id);
                  }}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={selectedTags.length === 0 ? placeholder : ""}
              className="flex-1 min-w-15 bg-transparent text-base text-neutral-800 placeholder:text-neutral-400 outline-none"
            />
          </div>
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="start"
        sideOffset={4}
        style={{ width: anchorWidth }}
        className="p-0 rounded-sm border border-neutral-100 shadow-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-base font-semibold text-neutral-900 mb-1">
            Processes for this product:
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              {selectedCount} selected
            </span>
            <button
              onClick={handleClearAll}
              className="text-sm text-neutral-700 hover:text-neutral-900 font-medium cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Process list */}
        <div className="max-h-75 overflow-y-auto">
          {filteredProcesses.map((process) => (
            <ProcessItem
              key={process.id}
              process={process}
              isSelected={selectedProcessIds.has(process.id)}
              selectedTagIds={selectedTagIds}
              onToggleProcess={handleToggleProcess}
              onToggleTag={handleToggleTag}
            />
          ))}
          {filteredProcesses.length === 0 && (
            <div className="py-6 text-center text-sm text-neutral-400 border-t border-neutral-50">
              No processes found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
