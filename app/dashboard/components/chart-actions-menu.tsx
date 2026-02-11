"use client";

import { useState } from "react";
import {
  X,
  Import,
  Share2,
  Printer,
  TextAlignJustify,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Bookmark, CursorClick, CursorClickLine, SaveAs } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}

function ActionButton({ icon, active, onClick, className, tooltip }: ActionButtonProps) {
  const button = (
    <button
      onClick={onClick}
      className={cn(
        "size-8 flex items-center justify-center rounded border transition-all",
        active
          ? "bg-neutral-50 border-white shadow-[0px_0px_0px_2px_rgba(206,212,224,0.32)]"
          : "bg-neutral-25 border-neutral-50 hover:bg-neutral-50",
        className
      )}
    >
      <span className="text-neutral-600">{icon}</span>
    </button>
  );

  if (!tooltip) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="left">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ChartActionsMenuProps {
  onClose?: () => void;
  className?: string;
  activeAction?: string;
  onActiveActionChange?: (action: string) => void;
}

export function ChartActionsMenu({ className, activeAction: controlledActiveAction, onActiveActionChange }: ChartActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [internalActiveAction, setInternalActiveAction] = useState<string>("hand");
  const activeAction = controlledActiveAction ?? internalActiveAction;
  const setActiveAction = onActiveActionChange ?? setInternalActiveAction;

  return (
    <>
      {/* Mobile layout */}
      <div className="flex md:hidden flex-col gap-1">
        {/* Grouped buttons */}
        <div className="flex flex-col border border-neutral-50 rounded overflow-hidden">
          <ActionButton
            icon={<CursorClick className="size-4" />}
            active={activeAction === "pencil"}
            onClick={() => setActiveAction("pencil")}
            className="rounded-none border-0"
            tooltip="Crosshairs Cursor"
          />
          <ActionButton
            icon={<CursorClickLine className="size-4" />}
            active={activeAction === "hand"}
            onClick={() => setActiveAction("hand")}
            className="rounded-none border-0 border-t border-neutral-50"
            tooltip="Line Cursor"
          />
        </div>
        <ActionButton
          icon={<Import className="size-4" />}
          active={activeAction === "download"}
          onClick={() => setActiveAction("download")}
          tooltip="Save Trend"
        />
        <ActionButton
          icon={<Share2 className="size-4" />}
          active={activeAction === "share"}
          onClick={() => setActiveAction("share")}
          tooltip="Share Trend"
        />
        <ActionButton
          icon={<Printer className="size-4" />}
          active={activeAction === "print"}
          onClick={() => setActiveAction("print")}
          tooltip="Print trend"
        />
        <ActionButton
          icon={<SaveAs className="size-4" />}
          active={activeAction === "save"}
          onClick={() => setActiveAction("save")}
          tooltip="Export trend"
        />
        <ActionButton
          icon={<Bookmark className="size-4" />}
          active={activeAction === "book"}
          onClick={() => setActiveAction("book")}
          tooltip="Add Annotation"
        />
      </div>

      {/* Tablet layout */}
      <div className="hidden md:flex lg:hidden items-center gap-1 lg:px-2 lg:py-2 bg-primary-25">
        <div className="flex border overflow-hidden">
          <ActionButton
            icon={<CursorClick className="size-4" />}
            active={activeAction === "pencil"}
            onClick={() => setActiveAction("pencil")}
            className="rounded-none border-0"
            tooltip="Crosshairs Cursor"
          />
          <ActionButton
            icon={<CursorClickLine className="size-4" />}
            active={activeAction === "hand"}
            onClick={() => setActiveAction("hand")}
            className="rounded-none border-0 border-l border-neutral-50"
            tooltip="Line Cursor"
          />
        </div>
        <ActionButton
          icon={<Import className="size-4" />}
          active={activeAction === "download"}
          onClick={() => setActiveAction("download")}
          tooltip="Save Trend"
        />
        <ActionButton
          icon={<Share2 className="size-4" />}
          active={activeAction === "share"}
          onClick={() => setActiveAction("share")}
          tooltip="Share Trend"
        />
        <ActionButton
          icon={<Printer className="size-4" />}
          active={activeAction === "print"}
          onClick={() => setActiveAction("print")}
          tooltip="Print trend"
        />
        <ActionButton
          icon={<SaveAs className="size-4" />}
          active={activeAction === "save"}
          onClick={() => setActiveAction("save")}
          tooltip="Export trend"
        />
        <ActionButton
          icon={<Bookmark className="size-4" />}
          active={activeAction === "book"}
          onClick={() => setActiveAction("book")}
          tooltip="Add Annotation"
        />
      </div>

      {/* Desktop Popover (hidden on mobile and tablets) */}
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "size-8 bg-neutral-25 border-neutral-50 rounded text-neutral-600 hover:bg-neutral-50 hidden lg:flex",
                    className
                  )}
                >
                  {open ? <X className="size-4" /> : <TextAlignJustify className="size-4" />}
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent
          side="bottom"
          align="center"
          sideOffset={4}
          className="w-[50px] h-100 pb-2 px-2 pt-1 bg-primary-25 border-neutral-25 shadow-none rounded-tl-none rounded-tr-none border-t-0 rounded-bl-sm rounded-br-sm"
        >
          <div className="flex flex-col gap-2 items-center">

            {/* Separator */}
            <div className="w-full h-px bg-neutral-100" />

            {/* Button group */}
            <div className="flex flex-col gap-1">
              {/* Grouped buttons */}
              <div className="flex flex-col border border-neutral-50 rounded-bl-sm rounded-br-sm overflow-hidden">
                <ActionButton
                  icon={<CursorClick className="size-4" />}
                  active={activeAction === "pencil"}
                  onClick={() => setActiveAction("pencil")}
                  className="rounded-none border-0"
                  tooltip="Crosshairs Cursor"
                />
                <ActionButton
                  icon={<CursorClickLine className="size-4" />}
                  active={activeAction === "hand"}
                  onClick={() => setActiveAction("hand")}
                  className="rounded-none border-0 border-t border-neutral-50"
                  tooltip="Line Cursor"
                />
              </div>

              {/* Save Trend button */}
              <ActionButton
                icon={<Import className="size-4" />}
                active={activeAction === "download"}
                onClick={() => setActiveAction("download")}
                tooltip="Save Trend"
              />

              {/* Share Trend button */}
              <ActionButton
                icon={<Share2 className="size-4" />}
                active={activeAction === "share"}
                onClick={() => setActiveAction("share")}
                tooltip="Share Trend"
              />

              {/* Print trend button */}
              <ActionButton
                icon={<Printer className="size-4" />}
                active={activeAction === "print"}
                onClick={() => setActiveAction("print")}
                tooltip="Print trend"
              />

              {/* Export trend button */}
              <ActionButton
                icon={<SaveAs className="size-4" />}
                active={activeAction === "save"}
                onClick={() => setActiveAction("save")}
                tooltip="Export trend"
              />

              {/* Add Annotation button */}
              <ActionButton
                icon={<Bookmark className="size-4" />}
                active={activeAction === "book"}
                onClick={() => setActiveAction("book")}
                tooltip="Add Annotation"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
