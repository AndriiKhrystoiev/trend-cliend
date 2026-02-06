"use client";

import { useState } from "react";
import Chrome from "@uiw/react-color-chrome";
import { GithubPlacement } from "@uiw/react-color-github";
import { hsvaToHex, hexToHsva, HsvaColor } from "@uiw/color-convert";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onChange?: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [hsva, setHsva] = useState<HsvaColor>(() => hexToHsva(color));
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (colorResult: { hsva: HsvaColor }) => {
    setHsva(colorResult.hsva);
    onChange?.(hsvaToHex(colorResult.hsva));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "size-7 rounded-sm bg-white border-1 border-neutral-100 cursor-pointer hover:ring-2 hover:ring-primary-200 transition-all p-1",
            className
          )}
          aria-label="Pick color"
        >
          <div
            className="w-full h-full rounded-xs"
            style={{ backgroundColor: color }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-0 shadow-lg" align="start">
        <Chrome
          color={hsva}
          onChange={handleChange}
          placement={GithubPlacement.TopLeft}
          showAlpha={false}
          showEyeDropper={true}
          showColorPreview={true}
          showEditableInput={true}
          showHue={true}
          style={{
            boxShadow: "none",
            borderRadius: 8,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
