"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavBrandProps {
  variant?: "top" | "bottom";
  className?: string;
}

export function NavBrand({ variant = "top", className }: NavBrandProps) {
  if (variant === "top") {
    return (
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2.5 group transition-opacity hover:opacity-90",
          className,
        )}
      >
        <div className="relative w-8 h-8 rounded-xl bg-[#6139DB] flex items-center justify-center shadow-md shadow-[#6139DB]/30 transition-transform group-hover:scale-105">
          <Home className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold text-[#111111] tracking-tight">
          Landora
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("flex flex-col gap-0.5 group", className)}>
      <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6139DB] to-[#6139DB]/80 bg-clip-text text-transparent tracking-tight transition-opacity group-hover:opacity-90">
        Landora
      </span>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-[#3A3C40] font-medium leading-tight">
        Zameen ka Har Raaz, Landora Ke Pass
      </span>
    </Link>
  );
}

