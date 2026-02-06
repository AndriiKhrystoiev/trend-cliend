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
        "flex items-center gap-2 rounded-sm border border-neutral-100 bg-neutral-25 px-3.5 py-3",
        className
      )}
    >
      <Search className="size-5 shrink-0 text-neutral-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-auto border-0 !bg-transparent p-0 text-base text-neutral-800 placeholder:text-neutral-400 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
