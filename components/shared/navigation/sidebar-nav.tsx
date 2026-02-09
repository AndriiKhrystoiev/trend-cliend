"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TreeCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

function TreeCheckbox({ checked, onChange }: TreeCheckboxProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={cn(
        "flex size-[12px] shrink-0 items-center justify-center rounded-[3px] border transition-colors",
        checked
          ? "border-primary-500 bg-primary-500"
          : "border-neutral-100 bg-white"
      )}
    >
      {checked && <Check className="size-2 text-white" strokeWidth={3} />}
    </button>
  );
}

interface TreeNode {
  id: string;
  name: string;
  type: "company" | "location" | "area" | "line" | "process" | "tag";
  children?: TreeNode[];
  selected?: boolean;
}

// Mock data structure matching the Figma design
const mockTreeData: TreeNode[] = [
  {
    id: "company-1",
    name: "Company 1",
    type: "company",
    children: [
      {
        id: "location-1",
        name: "Location 1",
        type: "location",
        children: [
          {
            id: "area-1",
            name: "Area 1",
            type: "area",
            children: [
              {
                id: "line-1",
                name: "Line 1",
                type: "line",
                children: [
                  {
                    id: "process-1",
                    name: "Process 1",
                    type: "process",
                    children: [
                      { id: "tag-1", name: "Teg 1", type: "tag", selected: true },
                      { id: "tag-2", name: "Teg 2", type: "tag", selected: true },
                    ],
                  },
                  { id: "process-2", name: "Process 2", type: "process" },
                ],
              },
              { id: "line-2", name: "Line 2", type: "line" },
            ],
          },
          { id: "area-2", name: "Area 2", type: "area" },
        ],
      },
      { id: "location-2", name: "Location 2", type: "location" },
    ],
  },
  { id: "company-2", name: "Company 2", type: "company" },
];

interface TreeItemProps {
  node: TreeNode;
  level: number;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  selectedTags: Set<string>;
  isLast: boolean;
  parentLines: boolean[];
}

function TreeItem({
  node,
  level,
  expandedNodes,
  onToggle,
  onSelect,
  selectedTags,
  isLast,
  parentLines,
}: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isTag = node.type === "tag";
  const isCompany = node.type === "company";
  const isSelected = selectedTags.has(node.id);

  const handleClick = () => {
    if (isTag) {
      onSelect(node.id);
    } else if (hasChildren) {
      onToggle(node.id);
    }
  };

  return (
    <div className="relative">
      {/* Row container */}
      <div
        className={cn(
          "relative flex items-center h-10 cursor-pointer",
          isTag && isSelected && "bg-primary-25"
        )}
        onClick={handleClick}
      >
        {/* Tree lines for non-root items */}
        {level > 0 && (
          <>
            {/* Vertical lines from parent levels */}
            {parentLines.map((showLine, idx) => (
              showLine && (
                <div
                  key={idx}
                  className="absolute top-0 bottom-0 w-px bg-neutral-100"
                  style={{ left: `${idx * 24 + 20}px` }}
                />
              )
            ))}

            {/* Curved connector from parent vertical line to item */}
            <div
              className="absolute border-l border-b border-neutral-100 rounded-bl-xl"
              style={{
                left: `${(level - 1) * 24 + 20}px`,
                top: 0,
                width: '12px',
                height: '20px',
              }}
            />

            {/* Vertical line continuation for non-last items */}
            {!isLast && (
              <div
                className="absolute w-px bg-neutral-100"
                style={{
                  left: `${(level - 1) * 24 + 20}px`,
                  top: '20px',
                  bottom: 0,
                }}
              />
            )}
          </>
        )}

        {/* Content with proper indentation */}
        <div
          className="flex items-center gap-2 pl-3"
          style={{ marginLeft: `${level * 24}px` }}
        >
          {/* Icon/Checkbox/Chevron */}
          {isCompany ? (
            <>
              <Folder className="size-5 text-neutral-300 fill-none" strokeWidth={1.5} />
            </>
          ) : isTag ? (
            <TreeCheckbox
              checked={isSelected}
              onChange={() => onSelect(node.id)}
            />
          ) : hasChildren ? (
            <button className="flex size-5 items-center justify-center text-neutral-400">
              {isExpanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
          ) : (
            <button className="flex size-5 items-center justify-center text-neutral-400">
              <ChevronRight className="size-4" />
            </button>
          )}

          {/* Name */}
          <span
            className={cn(
              "text-sm whitespace-nowrap",
              isTag && isSelected ? "text-primary-500 font-medium" : "text-neutral-900"
            )}
          >
            {node.name}
          </span>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {node.children!.map((child, index) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedTags={selectedTags}
              isLast={index === node.children!.length - 1}
              parentLines={[...parentLines, !isLast && level > 0]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["company-1", "location-1", "area-1", "line-1", "process-1"])
  );
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(["tag-1", "tag-2"])
  );

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleTag = (id: string) => {
    setSelectedTags((prev) => {
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
    <nav className={cn("flex flex-col bg-white border-r border-neutral-50", className)}>
      {/* Server Select Dropdown */}
      <div className="p-3 border-b border-neutral-50">
        <Select defaultValue="">
          <SelectTrigger className="w-full border-neutral-100 bg-white text-sm text-neutral-900 hover:bg-neutral-25">
            <SelectValue placeholder="Select Server" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="server-1">Server 1</SelectItem>
            <SelectItem value="server-2">Server 2</SelectItem>
            <SelectItem value="server-3">Server 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tree Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {mockTreeData.map((node, index) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            expandedNodes={expandedNodes}
            onToggle={toggleNode}
            onSelect={toggleTag}
            selectedTags={selectedTags}
            isLast={index === mockTreeData.length - 1}
            parentLines={[]}
          />
        ))}
      </div>
    </nav>
  );
}
