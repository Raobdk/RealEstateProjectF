"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavSearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

export function NavSearchBar({
  className,
  onSearch,
}: NavSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 transition-all duration-200",
        isFocused && "border-white/40 bg-white/15 shadow-sm",
        className
      )}
    >
      <span className="text-[9px] uppercase tracking-[0.12em] text-white/75 px-2 whitespace-nowrap hidden lg:inline font-semibold">
        Property ID
      </span>
      <div className="flex items-center gap-1.5 bg-white/95 rounded-full px-2.5 py-1 flex-1 min-w-[120px] max-w-[180px] transition-all">
        <Search className="w-3.5 h-3.5 text-[#6139DB] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="bg-transparent outline-none text-xs text-[#111111] placeholder:text-[#3A3C40]/50 w-full min-w-0 font-medium"
        />
      </div>
    </form>
  );
}