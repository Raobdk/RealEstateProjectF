"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/layout/container";
import {
  Building2,
  Calculator,
  Home,
  Search,
  MapPin,
  TrendingUp,
  Ruler,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const exploreFeatures = [
  {
    icon: Building2,
    title: "New Projects",
    description: "The best investment opportunities",
    href: "/projects",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Calculator,
    title: "Construction Cost Calculator",
    description: "Get construction cost estimate",
    href: "/tools/construction-calculator",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Home,
    title: "Home Loan Calculator",
    description: "Find affordable loan packages",
    href: "/tools/loan-calculator",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Search,
    title: "Area Guides",
    description: "Explore housing societies in Pakistan",
    href: "/area-guides",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: MapPin,
    title: "Plot Finder",
    description: "Find plots in any housing society",
    href: "/plot-finder",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Property Index",
    description: "Track changes in real estate prices",
    href: "/property-index",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Ruler,
    title: "Area Unit Converter",
    description: "Convert any area unit instantly",
    href: "/tools/area-converter",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: TrendingUp,
    title: "Property Trends",
    description: "Find popular areas to buy property",
    href: "/trends",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

export function ExploreMore() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <Container>
        <AnimatedSection variant="slideUp" className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">
            Explore more on Landora
          </h2>
        </AnimatedSection>

        <AnimatedSection
          variant="slideUp"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
        >
          {exploreFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.href}
                className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#E7EAEF] hover:border-[#6139DB] hover:shadow-lg transition-all"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-14 rounded-lg sm:rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${feature.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold tracking-tight text-xl text-[#111111]">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3A3C40] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </AnimatedSection>
      </Container>
    </section>
  );
}

