"use client";

import { useState, useRef, useEffect } from "react";
import { Folder, ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface FolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
}

function FolderRow({
  name,
  depth,
  hasChildren,
  expanded,
  onToggle,
  onAdd,
  onDelete,
  isLast,
  parentLines,
}: {
  name: string;
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
  onToggle: () => void;
  onAdd: () => void;
  onDelete?: () => void;
  isLast: boolean;
  parentLines: boolean[];
}) {
  return (
    <div className="relative flex items-center justify-between py-1.5 rounded h-10">
      {depth > 0 && (
        <>
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
            <line x1="0.5" y1="0" x2="0.5" y2="12" stroke="#ced4e0" strokeWidth="1" />
            <path
              d="M0.5 12 C0.5 16.418 4.082 20 8.5 20 L12.5 20"
              stroke="#ced4e0"
              strokeWidth="1"
              fill="none"
            />
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
      <div className="flex items-center shrink-0">
        <button
          onClick={onAdd}
          className="text-neutral-300 hover:text-neutral-600 px-1"
        >
          <span className="text-lg leading-none">+</span>
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-neutral-300 hover:text-neutral-600 px-1"
          >
            <Trash2 className="size-3.5" />
          </button>
        )}
      </div>
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
      <Folder className="size-4 text-neutral-300 shrink-0" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (value.trim()) onSubmit(value.trim());
          else onCancel();
        }}
        className="h-7 text-sm border-neutral-200 px-2 !focus:shadow-0 !focus:border-none !outline-0"
      />
    </div>
  );
}

interface FolderTreeProps {
  initialFolders: FolderNode[];
  showDelete?: boolean;
  className?: string;
}

export function FolderTree({ initialFolders, showDelete, className }: FolderTreeProps) {
  const [folders, setFolders] = useState<FolderNode[]>(initialFolders);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["1", "1-1"])
  );
  const [newFolderParentId, setNewFolderParentId] = useState<string | null>(null);

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

  const deleteFolder = (
    nodes: FolderNode[],
    targetId: string
  ): FolderNode[] => {
    return nodes
      .filter((node) => node.id !== targetId)
      .map((node) => {
        if (node.children) {
          return { ...node, children: deleteFolder(node.children, targetId) };
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

  const handleDeleteFolder = (id: string) => {
    setFolders((prev) => deleteFolder(prev, id));
  };

  const renderTree = (nodes: FolderNode[], depth: number, parentLines: boolean[] = []): React.ReactNode => {
    return nodes.map((folder, index) => {
      const hasChildren = !!(folder.children && folder.children.length > 0);
      const isExpanded = expandedIds.has(folder.id);
      const isAddingHere = newFolderParentId === folder.id;
      const showChildren = isExpanded && hasChildren;
      const isLast = index === nodes.length - 1;

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
            onDelete={showDelete ? () => handleDeleteFolder(folder.id) : undefined}
            isLast={isLast}
            parentLines={parentLines}
          />
          {(showChildren || isAddingHere) && (
            <div className="relative">
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
    <div className={cn("rounded-md border border-neutral-50 bg-neutral-25 p-3 max-h-80 overflow-y-auto", className)}>
      {renderTree(folders, 0)}
    </div>
  );
}
