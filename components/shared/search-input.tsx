"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Search",
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm border border-[#e5e7eb] bg-[#f9fafb] px-3.5 py-3",
        className
      )}
    >
      <Search className="size-5 shrink-0 text-[#6a7282]" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-auto border-0 bg-transparent p-0 text-base text-[#242a37] placeholder:text-[#6a7282] shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
