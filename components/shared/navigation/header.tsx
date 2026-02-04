"use client";

import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchInput } from "@/components/shared/search-input";

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
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="size-10 text-[#6a7282] hover:bg-[#f9fafb] lg:hidden"
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        )}
        <div className="text-lg font-semibold text-[#3347be]">LOGO</div>
      </div>

      {/* Center-Right: Search & Avatar */}
      <div className="flex items-center gap-4">
        {/* Search - Hidden on mobile, visible on tablet+ */}
        <SearchInput className="hidden md:flex w-[384px]" />

        {/* Search icon for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="flex md:hidden size-10 text-[#6a7282] hover:bg-[#f9fafb]"
        >
          <SearchInput className="size-6" />
        </Button>

        {/* Avatar */}
        <Avatar className="size-12 bg-[#ebedf6]">
          <AvatarFallback className="bg-[#ebedf6] text-base font-medium text-[#242a37]">
            PH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
