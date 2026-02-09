"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchInput } from "@/components/shared/search-input";

export function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-neutral-50 bg-white px-3 z-100">
      <div className="text-lg font-semibold text-primary-500">LOGO</div>

      {/* Center-Right: Search & Avatar */}
      <div className="flex items-center gap-4">
        {/* Search - Hidden on mobile, visible on tablet+ */}
        <SearchInput className="hidden md:flex w-[384px]" />

        {/* Search icon for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="flex md:hidden size-10 text-neutral-400 hover:bg-neutral-25"
        >
          <SearchInput className="size-6" />
        </Button>

        {/* Avatar */}
        <Avatar className="size-12 bg-neutral-50">
          <AvatarFallback className="bg-neutral-50 text-base font-medium text-neutral-900">
            PH
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
