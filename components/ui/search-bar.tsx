"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search properties, locations, or IDs...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-[#E7EAEF] bg-white p-2 shadow-sm transition-all focus-within:border-[#6139DB] focus-within:shadow-md",
        className
      )}
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search className="h-5 w-5 text-[#3A3C40] flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-[#111111] placeholder:text-[#3A3C40]/50 outline-none text-base"
        />
      </div>
      <Button type="submit" variant="gradient" size="default" className="flex-shrink-0">
        Search
      </Button>
    </form>
  );
}

