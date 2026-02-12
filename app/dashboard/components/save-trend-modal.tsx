"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderTree, FolderNode } from "@/components/ui/folder-tree";

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

interface SaveTrendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveTrendModal({ open, onOpenChange }: SaveTrendModalProps) {
  const [saved, setSaved] = useState(false);

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);
    if (!value) setSaved(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-116 p-6 gap-0"
      >
        {saved ? (
          <>
            <div className="flex justify-end">
              <button
                onClick={() => handleOpenChange(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col items-center text-left">
              {/* Success badge icon */}
              <div className="relative size-20 mb-6">
                <svg viewBox="0 0 80 80" fill="none" className="size-20">
                  <rect x="12" y="12" width="56" height="56" rx="4" fill="#BCF0DA" />
                  <rect x="12" y="12" width="60" height="60" rx="4" fill="#DEF7EC" transform="rotate(45 43 38)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-11 rounded-full border-[2.5px] border-emerald-700 flex items-center justify-center">
                    <Check className="size-6 text-emerald-700" strokeWidth={5} />
                  </div>
                </div>
              </div>

              <DialogHeader className="mb-2 w-full text-left">
                <DialogTitle className="text-xl font-semibold text-neutral-900">
                  Trend successfully saved!
                </DialogTitle>
              </DialogHeader>

              <p className="text-sm text-neutral-400 mb-6">
                The trend has been saved to your profile. To view it, go to Saved Trends and find it there.
              </p>
            </div>

            <Button
              className="w-full h-10 text-base font-medium"
              onClick={() => handleOpenChange(false)}
            >
              View saved trends
            </Button>
          </>
        ) : (
          <>
            {/* Header */}
            <DialogHeader className="flex flex-row items-center justify-between mb-2">
              <div>
                <DialogTitle className="text-xl font-semibold text-neutral-900">
                  Save trend
                </DialogTitle>
              </div>
              <button
                onClick={() => handleOpenChange(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="size-5" />
              </button>
            </DialogHeader>

            <p className="text-sm text-neutral-400 mb-5">
              Select or create a folder to save the trend
            </p>

            {/* Folder tree */}
            <FolderTree initialFolders={mockFolders} className="mb-6" />

            {/* Action button */}
            <Button
              className="w-full h-10 text-base font-medium"
              onClick={() => setSaved(true)}
            >
              View save trends
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
