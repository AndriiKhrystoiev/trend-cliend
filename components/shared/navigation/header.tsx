"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchInput } from "@/components/shared/search-input";

export function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsMobileSearchOpen(false);
      }
    }

    if (isMobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileSearchOpen]);

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-neutral-50 bg-white px-3 z-100">
      <div className="text-lg font-semibold text-primary-500">LOGO</div>

      {/* Center-Right: Search & Avatar */}
      <div className="flex items-center gap-4">
        {/* Search - Hidden on mobile, visible on tablet+ */}
        <SearchInput className="hidden md:flex w-[384px]" />

        {/* Mobile Search - Icon that expands to full search */}
        <div ref={searchRef} className="flex md:hidden">
          {isMobileSearchOpen ? (
            <SearchInput className="w-full" />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="size-10 text-neutral-400 hover:bg-neutral-25"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="size-6" />
            </Button>
          )}
        </div>

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
