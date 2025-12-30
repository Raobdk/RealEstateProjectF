"use client";

import { useState } from "react";
import { NavBrand } from "./nav-brand";
import { NavLinks } from "./nav-links";
import { NavActions } from "./nav-actions";
import { MobileMenu } from "./mobile-menu";
import { Container } from "./container";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { id: "home", label: "Home", href: "/" },
  { id: "properties", label: "Properties", href: "/properties" },
  { id: "agents", label: "Agents", href: "/agents" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

const secondaryLinks = [
  { id: "buy", label: "Buy", href: "/buy" },
  { id: "rent", label: "Rent", href: "/rent" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "agents", label: "Agents", href: "/agents" },
  { id: "blog", label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Logo + Primary Links + Actions */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#E7EAEF] bg-white/95 backdrop-blur-sm">
        <Container>
          <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
            <NavBrand variant="top" />
            <NavLinks links={primaryLinks} variant="primary" />
            <NavActions showSearch={true} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#3A3C40] hover:bg-[#E7EAEF] transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </div>

      {/* Bottom Bar - Brand + Secondary Links */}
      <div className="hidden lg:block fixed top-16 left-0 right-0 z-40 border-b border-[#E7EAEF] bg-white/95 backdrop-blur-sm h-14">
        <Container>
          <div className="flex h-14 items-center justify-between gap-4">
            <NavBrand variant="bottom" />
            <NavLinks links={secondaryLinks} variant="secondary" />
          </div>
        </Container>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        primaryLinks={primaryLinks}
        secondaryLinks={secondaryLinks}
      />
    </>
  );
}

