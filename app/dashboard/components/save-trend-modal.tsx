"use client";

import { useState, useRef, useEffect } from "react";
import { X, Folder, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
}

const mockFolders: FolderNode[] = [
  {
    id: "1",
    name: "Speed Trends",
    children: [
      {
        id: "1-1",
        name: "Speed Trends 1",
        children: [
          { id: "1-1-1", name: "Speed Trends 2" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Temperature Trends",
  },
];

function FolderRow({
  name,
  depth,
  hasChildren,
  expanded,
  onToggle,
  onAdd,
  isLast,
  parentLines,
}: {
  name: string;
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
  onToggle: () => void;
  onAdd: () => void;
  isLast: boolean;
  parentLines: boolean[];
}) {
  return (
    <div className="relative flex items-center justify-between py-1.5 rounded h-10">
      {/* Tree connecting lines for non-root items */}
      {depth > 0 && (
        <>
          {/* Vertical continuation lines from ancestor levels */}
          {parentLines.map((showLine, idx) => {
            if (!showLine || idx === 0) return null;
            return (
              <div
                key={idx}
                className="absolute top-0 bottom-0 bg-neutral-100"
                style={{
                  left: `${(idx - 1) * 24 + 20}px`,
                  width: '1px',
                }}
              />
            );
          })}

          {/* Connector for this item: vertical line + rounded curve + horizontal line */}
          <svg
            className="absolute top-0"
            style={{
              left: `${(depth - 1) * 24 + 20}px`,
            }}
            width="13"
            height="40"
            viewBox="0 0 13 40"
            fill="none"
          >
            {/* Vertical line from row top down to curve start at y=12 */}
            <line x1="0.5" y1="0" x2="0.5" y2="12" stroke="#ced4e0" strokeWidth="1" />
            {/* Quarter-circle curve (radius 8px) transitioning from vertical to horizontal */}
            <path
              d="M0.5 12 C0.5 16.418 4.082 20 8.5 20 L12.5 20"
              stroke="#ced4e0"
              strokeWidth="1"
              fill="none"
            />
            {/* Vertical continuation below curve for non-last siblings */}
            {!isLast && (
              <line x1="0.5" y1="20" x2="0.5" y2="40" stroke="#ced4e0" strokeWidth="1" />
            )}
          </svg>
        </>
      )}

      <div className="flex items-center gap-2 min-w-0 flex-1 pl-3" style={{ marginLeft: `${depth * 24}px` }}>
        {hasChildren && depth > 0 && (
          <button
            onClick={onToggle}
            className="text-neutral-400 hover:text-neutral-600 shrink-0"
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform text-neutral-300",
                !expanded && "-rotate-90"
              )}
            />
          </button>
        )}
        <Folder className="size-4 text-neutral-300 shrink-0" />
        <span className="text-sm text-neutral-700 truncate">{name}</span>
      </div>
      <button
        onClick={onAdd}
        className="text-neutral-300 hover:text-neutral-600 shrink-0 px-2"
      >
        <span className="text-lg leading-none">+</span>
      </button>
    </div>
  );
}

function NewFolderInput({
  depth,
  onSubmit,
  onCancel,
}: {
  depth: number;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("Folder");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value.trim());
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div
      className="flex items-center gap-2 py-1.5 pl-3"
      style={{ marginLeft: `${depth * 24}px` }}
    >
      <span className="w-4 shrink-0" />
      <Folder className="size-4 text-neutral-400 shrink-0" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (value.trim()) onSubmit(value.trim());
          else onCancel();
        }}
        className="h-7 text-sm border-neutral-200 px-2"
      />
    </div>
  );
}

interface SaveTrendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveTrendModal({ open, onOpenChange }: SaveTrendModalProps) {
  const [folders, setFolders] = useState<FolderNode[]>(mockFolders);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["1", "1-1"])
  );
  const [newFolderParentId, setNewFolderParentId] = useState<string | null>(
    null
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddFolder = (parentId: string) => {
    setExpandedIds((prev) => new Set(prev).add(parentId));
    setNewFolderParentId(parentId);
  };

  const addChildFolder = (
    nodes: FolderNode[],
    parentId: string,
    newFolder: FolderNode
  ): FolderNode[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newFolder],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addChildFolder(node.children, parentId, newFolder),
        };
      }
      return node;
    });
  };

  const handleNewFolderSubmit = (name: string) => {
    if (!newFolderParentId) return;
    const newFolder: FolderNode = {
      id: `${newFolderParentId}-${Date.now()}`,
      name,
    };
    setFolders((prev) => addChildFolder(prev, newFolderParentId, newFolder));
    setNewFolderParentId(null);
  };

  const renderTree = (nodes: FolderNode[], depth: number, parentLines: boolean[] = []): React.ReactNode => {
    return nodes.map((folder, index) => {
      const hasChildren = !!(folder.children && folder.children.length > 0);
      const isExpanded = expandedIds.has(folder.id);
      const isAddingHere = newFolderParentId === folder.id;
      const showChildren = isExpanded && hasChildren;
      const isLast = index === nodes.length - 1;

      // Build parentLines for children: current depth needs a line if not last sibling
      const childParentLines = [...parentLines, !isLast];

      return (
        <div key={folder.id}>
          <FolderRow
            name={folder.name}
            depth={depth}
            hasChildren={hasChildren}
            expanded={isExpanded}
            onToggle={() => toggleExpand(folder.id)}
            onAdd={() => handleAddFolder(folder.id)}
            isLast={isLast}
            parentLines={parentLines}
          />
          {(showChildren || isAddingHere) && (
            <div className="relative">
              {/* Vertical continuation line for expanded parent */}
              {showChildren && (
                <div
                  className="absolute top-0 bottom-0 w-px bg-neutral-100"
                  style={{
                    left: `${depth * 24 + 20}px`,
                  }}
                />
              )}
              {showChildren && renderTree(folder.children!, depth + 1, childParentLines)}
              {isAddingHere && (
                <NewFolderInput
                  depth={depth + 1}
                  onSubmit={handleNewFolderSubmit}
                  onCancel={() => setNewFolderParentId(null)}
                />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-116 p-6 gap-0"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-2">
          <div>
            <DialogTitle className="text-xl font-semibold text-neutral-900">
              Save trend
            </DialogTitle>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </DialogHeader>

        <p className="text-sm text-neutral-400 mb-5">
          Select or create a folder to save the trend
        </p>

        {/* Folder tree */}
        <div className="rounded-md border border-neutral-50 bg-neutral-25 p-3 mb-6 max-h-80 overflow-y-auto">
          {renderTree(folders, 0)}
        </div>

        {/* Action button */}
        <Button className="w-full h-10 text-base font-medium">
          View save trends
        </Button>
      </DialogContent>
    </Dialog>
  );
}
