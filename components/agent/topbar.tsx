"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AgentTopbarProps {
  onMenuClick?: () => void;
}

export function AgentTopbar({ onMenuClick }: AgentTopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 border-b border-[#E7EAEF] bg-white/95 backdrop-blur-sm w-full">
      <div className="flex h-full items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#3A3C40] hover:bg-[#E7EAEF] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3A3C40]/60" />
          <Input
            type="text"
            placeholder="Search leads, plots, buyers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#FAFAFA] border-[#E7EAEF]"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

