"use client";

import Link from "next/link";
import { Plus, Settings, User } from "lucide-react";
import { NavSearchBar } from "./nav-search-bar";
import { cn } from "@/lib/utils";

interface NavActionsProps {
  className?: string;
  showSearch?: boolean;
}

export function NavActions({ className, showSearch = true }: NavActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 lg:gap-3 flex-shrink-0",
        className,
      )}
    >
      {showSearch && (
        <div className="hidden md:flex">
          <NavSearchBar />
        </div>
      )}

      <Link
        href="/properties"
        className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#6139DB] text-white text-xs font-semibold shadow-md shadow-[#6139DB]/30 transition-all duration-200 hover:bg-[#6139DB]/90 hover:scale-105 active:scale-95"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Property</span>
      </Link>

      <button
        className="hidden sm:flex text-xs uppercase tracking-wider text-[#3A3C40] hover:text-[#111111] transition-colors font-medium"
        aria-label="Language"
      >
        اردو
      </button>

      <button
        className="w-5 h-5 flex items-center justify-center text-[#3A3C40] hover:text-[#111111] transition-colors"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      <Link
        href="/auth/login"
        className="w-5 h-5 flex items-center justify-center text-[#3A3C40] hover:text-[#111111] transition-colors"
        aria-label="User Profile"
      >
        <User className="w-5 h-5" />
      </Link>
    </div>
  );
}

