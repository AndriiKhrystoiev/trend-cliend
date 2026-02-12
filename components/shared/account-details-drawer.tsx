"use client";

import { useState, useRef } from "react";
import { X, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface AccountDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountDetailsDrawer({ open, onOpenChange }: AccountDetailsDrawerProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[95%] pl-4 sm:max-w-xl gap-0 rounded-tl-lg rounded-bl-lg p-0"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between p-6 pb-0">
          <SheetTitle className="text-2xl font-semibold text-neutral-900">
            Account details
          </SheetTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Upload Profile Picture Section */}
          <div className="mb-8">
            <h3 className="font-semibold text-neutral-900 mb-4">
              Upload profile picture
            </h3>
            <div className="flex items-center gap-4">
              <Avatar className="size-16 shrink-0 rounded-lg">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile" />
                ) : null}
                <AvatarFallback className="bg-neutral-50 text-lg font-medium text-neutral-900">
                  PH
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/svg+xml,image/png,image/jpeg,image/gif"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-neutral-400 bg-neutral-25 rounded-lg h-10 border border-neutral-100 file:mr-3 file:h-10 file:px-4 file:rounded-l-lg file:rounded-r-none file:border-0 file:border-r file:border-solid file:border-neutral-100 file:bg-neutral-50 file:text-sm file:font-medium file:text-neutral-500 file:cursor-pointer hover:file:bg-neutral-100"
                />
                <p className="text-xs text-neutral-400 mt-2">
                  SVG, PNG, JPG or GIF (MAX. 800×400px)
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setProfileImage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="w-fit mt-4 h-9 px-4 text-sm font-medium text-neutral-700"
            >
              <Trash2 className="size-4 mr-2" />
              Remove profile picture
            </Button>
          </div>

          {/* Folders Section */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">
              Folders
            </h3>
            <FolderTree initialFolders={mockFolders} showDelete />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
