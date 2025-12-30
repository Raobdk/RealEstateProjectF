"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  primaryLinks: NavLink[];
  secondaryLinks: NavLink[];
}

export function MobileMenu({
  isOpen,
  onClose,
  primaryLinks,
  secondaryLinks,
}: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY;
      const body = document.body;
      const html = document.documentElement;

      // Lock body scroll
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";

      // Lock html scroll (some browsers need this)
      html.style.overflow = "hidden";
      html.style.position = "fixed";
      html.style.width = "100%";
      html.style.height = "100%";
    } else {
      // Restore scroll position
      const body = document.body;
      const html = document.documentElement;

      // Restore body styles
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.touchAction = "";

      // Restore html styles
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";

      // Restore scroll position
      if (scrollYRef.current > 0) {
        window.scrollTo(0, scrollYRef.current);
        scrollYRef.current = 0;
      }
    }

    // Cleanup on unmount
    return () => {
      if (typeof window === "undefined") return;
      const body = document.body;
      const html = document.documentElement;

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.touchAction = "";

      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
    };
  }, [isOpen]);

  // Prevent drawer scroll from propagating to body
  const handleDrawerScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  // Close on escape key - SSR safe
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleEscape);
      }
    };
  }, [isOpen, onClose]);

  // Prevent backdrop clicks from bubbling
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop - Dark blurred overlay with pointer-events blocking */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            onTouchStart={(e) => {
              e.stopPropagation();
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] lg:hidden"
            style={{
              touchAction: "none",
              pointerEvents: "auto",
            }}
            aria-hidden="true"
            role="presentation"
          />

          {/* Drawer Panel - Slides in from right */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            onWheel={handleDrawerScroll}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "fixed top-0 right-0 h-screen",
              "w-[75vw] sm:w-[70vw] md:w-[60vw] max-w-sm",
              "bg-white border-l border-[#E7EAEF]",
              "z-[70] lg:hidden",
              "overflow-y-auto overscroll-contain",
              "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            )}
            style={{
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#E7EAEF] sticky top-0 bg-white z-10">
                <h2 className="text-base font-bold text-[#111111]">Menu</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-label="Close menu"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                {/* Search Bar - Compact */}
                <div className="pb-3 border-b border-[#E7EAEF]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-[#FAFAFA] border border-[#E7EAEF] rounded-lg text-[#3A3C40] placeholder:text-gray-400 focus:outline-none focus:border-[#6139DB] focus:ring-1 focus:ring-[#6139DB]/30 transition-colors"
                      aria-label="Search in menu"
                    />
                  </div>
                </div>

                {/* Main Menu Section */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold px-2 mb-2">
                    MAIN MENU
                  </p>
                  <nav className="space-y-0.5" aria-label="Main navigation">
                    {primaryLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        onClick={onClose}
                        className="block px-3 py-2 text-sm font-medium text-[#3A3C40] hover:text-[#6139DB] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10" aria-hidden="true" />

                {/* Browse Section */}
                <div className="space-y-2">
                    <div className="flex flex-col gap-1 px-2">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold">
                      BROWSE
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold">
                      BUY
                    </p>
                  </div>
                    <nav className="space-y-0.5" aria-label="Browse navigation">
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] rounded-lg transition-colors",
                          link.active
                            ? "text-[#6139DB] bg-[#6139DB]/10 border border-[#6139DB]/20"
                            : "text-[#3A3C40] hover:text-[#6139DB] hover:bg-gray-50"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Footer - Add Property Button */}
              <div className="px-4 pt-3 pb-4 border-t border-[#E7EAEF] sticky bottom-0 bg-white">
                <Link
                  href="/properties"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#6139DB] text-white text-sm font-semibold shadow-md shadow-[#6139DB]/30 transition-all hover:bg-[#6139DB]/90 active:scale-95"
                >
                  Add Property
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
