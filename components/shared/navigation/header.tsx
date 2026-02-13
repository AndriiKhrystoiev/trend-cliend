"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchInput } from "@/components/shared/search-input";
import { AccountDetailsDrawer } from "@/components/shared/account-details-drawer";

export function Header() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
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
    <header className="flex h-[72px] items-center justify-between border-b border-neutral-50 bg-white px-3 z-400">
      {/* Mobile Search Active - takes full width */}
      {isMobileSearchOpen ? (
        <div ref={searchRef} className="flex flex-1 items-center gap-2 md:hidden">
          <SearchInput className="flex-1" />
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 text-neutral-400 hover:bg-neutral-25"
            onClick={() => setIsMobileSearchOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>
      ) : (
        <div className="text-lg font-semibold text-primary-500 md:block hidden">LOGO</div>
      )}

      {/* Show LOGO on mobile only when search is closed */}
      {!isMobileSearchOpen && (
        <div className="text-lg font-semibold text-primary-500 md:hidden">LOGO</div>
      )}

      {/* Center-Right: Search & Avatar */}
      <div className={`flex items-center gap-4 ${isMobileSearchOpen ? "hidden" : ""}`}>
        {/* Search - Hidden on mobile, visible on tablet+ */}
        <SearchInput className="hidden md:flex w-[384px]" />

        {/* Mobile Search Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="size-10 text-neutral-400 hover:bg-neutral-25 md:hidden"
          onClick={() => setIsMobileSearchOpen(true)}
        >
          <Search className="size-6" />
        </Button>

        {/* Avatar */}
        <button onClick={() => setIsAccountOpen(true)} className="cursor-pointer">
          <Avatar className="size-12 bg-neutral-50">
            <AvatarFallback className="bg-neutral-50 text-base font-medium text-neutral-900">
              PH
            </AvatarFallback>
          </Avatar>
        </button>
      </div>

      <AccountDetailsDrawer open={isAccountOpen} onOpenChange={setIsAccountOpen} />
    </header>
  );
}
