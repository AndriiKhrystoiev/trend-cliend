"use client";

import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, isMenuOpen, showMenuButton = false }: HeaderProps) {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#ebedf6] bg-white px-3">
      {/* Left: Logo & Menu Toggle */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuToggle}
            className="flex size-10 items-center justify-center rounded-lg text-[#6a7282] hover:bg-[#f9fafb] lg:hidden"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        )}
        <div className="text-lg font-semibold text-[#3347be]">LOGO</div>
      </div>

      {/* Center-Right: Search & Avatar */}
      <div className="flex items-center gap-4">
        {/* Search - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-3.5 py-3 shadow-[0px_1px_0.5px_0px_rgba(29,41,61,0.02)] w-[384px]">
          <Search className="size-6 text-[#6a7282]" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-base text-[#6a7282] placeholder:text-[#6a7282] outline-none"
          />
        </div>

        {/* Search icon for mobile */}
        <button className="flex md:hidden size-10 items-center justify-center rounded-lg text-[#6a7282] hover:bg-[#f9fafb]">
          <Search className="size-6" />
        </button>

        {/* Avatar */}
        <div className="flex size-12 items-center justify-center rounded-full bg-[#ebedf6]">
          <span className="text-base font-medium text-[#242a37]">PH</span>
        </div>
      </div>
    </header>
  );
}
