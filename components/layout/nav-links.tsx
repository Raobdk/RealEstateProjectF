"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  className?: string;
  variant?: "primary" | "secondary";
}

export function NavLinks({
  links,
  className,
  variant = "primary",
}: NavLinksProps) {
  const pathname = usePathname();

  if (variant === "primary") {
    return (
      <nav
        className={cn(
          "hidden lg:flex items-center gap-4 xl:gap-5",
          className,
        )}
      >
        {links.map((link) => {
          const isActive = link.active || pathname === link.href;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] text-[#3A3C40] hover:text-[#111111] transition-colors duration-200 whitespace-nowrap",
                isActive && "text-[#111111]"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  // Secondary variant (for bottom bar)
  return (
    <nav
      className={cn(
        "hidden md:flex items-center gap-4 lg:gap-5 xl:gap-6",
        className,
      )}
    >
      {links.map((link) => {
        const isActive = link.active || pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.12em] text-[#3A3C40] hover:text-[#6139DB] transition-colors duration-200 whitespace-nowrap relative",
              isActive && "text-[#6139DB]"
            )}
          >
            {link.label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6139DB] rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}