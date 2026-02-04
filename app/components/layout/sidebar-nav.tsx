"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, MapPin, Grid3X3, GitBranch, Workflow, Tag, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

function TreeItem({ node, level, expandedNodes, onToggle, onSelect, selectedTags }: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isTag = node.type === "tag";
  const isSelected = selectedTags.has(node.id);

  const getIcon = () => {
    switch (node.type) {
      case "company":
        return <Folder className="size-5 text-[#6a7282]" />;
      case "location":
        return <MapPin className="size-5 text-[#6a7282]" />;
      case "area":
        return <Grid3X3 className="size-5 text-[#6a7282]" />;
      case "line":
        return <GitBranch className="size-5 text-[#6a7282]" />;
      case "process":
        return <Workflow className="size-5 text-[#6a7282]" />;
      case "tag":
        return <Tag className="size-5 text-[#3347be]" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-1.5 px-2 cursor-pointer hover:bg-[#f3f4f6] rounded",
          isTag && isSelected && "bg-[#eef0fb]"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (isTag) {
            onSelect(node.id);
          } else if (hasChildren) {
            onToggle(node.id);
          }
        }}
      >
        {/* Expand/Collapse or Checkbox */}
        {hasChildren ? (
          <button className="flex size-5 items-center justify-center text-[#6a7282]">
            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
        ) : isTag ? (
          <div
            className={cn(
              "flex size-5 items-center justify-center rounded border",
              isSelected
                ? "bg-[#3347be] border-[#3347be]"
                : "border-[#ced4e0] bg-white"
            )}
          >
            {isSelected && <Check className="size-3 text-white" />}
          </div>
        ) : (
          <div className="size-5" />
        )}

        {/* Icon */}
        {getIcon()}

        {/* Name */}
        <span
          className={cn(
            "text-sm",
            isTag && isSelected ? "text-[#3347be] font-medium" : "text-[#242a37]"
          )}
        >
          {node.name}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedTags={selectedTags}
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
    <nav className={cn("flex flex-col bg-white border-r border-[#ebedf6]", className)}>
      {/* Server Select Dropdown */}
      <div className="p-3 border-b border-[#ebedf6]">
        <button className="flex w-full items-center justify-between rounded-lg border border-[#ced4e0] bg-white px-3 py-2.5 text-sm text-[#242a37] hover:bg-[#f9fafb]">
          <span>Select Server</span>
          <ChevronDown className="size-5 text-[#6a7282]" />
        </button>
      </div>

      {/* Tree Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {mockTreeData.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            expandedNodes={expandedNodes}
            onToggle={toggleNode}
            onSelect={toggleTag}
            selectedTags={selectedTags}
          />
        ))}
      </div>
    </nav>
  );
}
