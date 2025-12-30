import Link from "next/link";
import { Container } from "./container";
import { GradientText } from "@/components/ui/gradient-text";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  services: [
    { label: "Buy Property", href: "/buy" },
    { label: "Rent Property", href: "/rent" },
    { label: "Sell Property", href: "/sell" },
    { label: "Projects", href: "/projects" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                <GradientText>Landora</GradientText>
              </h3>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-white/60 leading-relaxed">
                Zameen ka Har Raaz, Landora Ke Pass
              </p>
            </div>
            <p className="text-sm text-white/70 max-w-md">
              Your trusted real estate platform for buying, selling, and renting properties across Pakistan.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a
                href="mailto:raozohaibofficial06@gmail.com"
                className="hover:text-white transition-colors"
              >
                raozohaibofficial06@gmail.com
              </a>
              <a
                href="tel:+923037550673"
                className="hover:text-white transition-colors"
              >
                +92 303 7550673
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {currentYear} Landora. Developed by Rao Zohaib. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

