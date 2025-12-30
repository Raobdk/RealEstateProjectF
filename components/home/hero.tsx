"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import { ChevronDown, Check } from "lucide-react";

type PropertyType = "buy" | "rent" | "projects";
type Currency = "PKR" | "USD" | "AED" | "SAR";
type AreaUnit = "marla" | "kanal" | "square-feet";

const cities = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

const currencies: { code: Currency; label: string }[] = [
  { code: "PKR", label: "PKR (Rs)" },
  { code: "USD", label: "USD ($)" },
  { code: "AED", label: "AED (د.إ)" },
  { code: "SAR", label: "SAR (﷼)" },
];

const areaUnits: { value: AreaUnit; label: string }[] = [
  { value: "marla", label: "Marla" },
  { value: "kanal", label: "Kanal" },
  { value: "square-feet", label: "Square Feet" },
];

export function Hero() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<PropertyType>("buy");
  const [city, setCity] = useState("Islamabad");
  const [location, setLocation] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [currency, setCurrency] = useState<Currency>("PKR");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("marla");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showAreaUnitDropdown, setShowAreaUnitDropdown] = useState(false);

  const handleSearch = () => {
    // Build search query and navigate to properties page
    const params = new URLSearchParams();
    params.set("type", propertyType);
    params.set("city", city);
    if (location) params.set("location", location);
    params.set("currency", currency);
    params.set("areaUnit", areaUnit);
    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setPropertyType("buy");
    setCity("Islamabad");
    setLocation("");
    setCurrency("PKR");
    setAreaUnit("marla");
    setShowCityDropdown(false);
    setShowCurrencyDropdown(false);
    setShowAreaUnitDropdown(false);
  };

  const anyDropdownOpen = showCityDropdown || showCurrencyDropdown || showAreaUnitDropdown;

  return (
    <section className="relative h-[calc(100vh-4rem)] lg:h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <Container className="relative z-10 h-full flex items-center justify-center py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          {/* Main Heading */}
          <AnimatedSection variant="slideUp" className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight px-4">
              Search properties for sale in Pakistan
            </h1>
          </AnimatedSection>

          {/* Search Widget */}
          <AnimatedSection variant="slideUp" delay={0.2}>
            <div className="bg-black/70 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-5 shadow-2xl border border-white/10">
              {/* Property Type Buttons */}
              <div className="flex gap-1.5 sm:gap-2 md:gap-2.5 mb-2 sm:mb-2.5 md:mb-3">
                <button
                  onClick={() => setPropertyType("buy")}
                  className={`flex-1 py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold transition-all ${
                    propertyType === "buy"
                      ? "bg-white text-[#111111] shadow-md"
                      : "bg-[#3A3C40] text-white hover:bg-[#3A3C40]/80"
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setPropertyType("rent")}
                  className={`flex-1 py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold transition-all ${
                    propertyType === "rent"
                      ? "bg-white text-[#111111] shadow-md"
                      : "bg-[#3A3C40] text-white hover:bg-[#3A3C40]/80"
                  }`}
                >
                  RENT
                </button>
                <button
                  onClick={() => setPropertyType("projects")}
                  className={`flex-1 py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold transition-all ${
                    propertyType === "projects"
                      ? "bg-white text-[#111111] shadow-md"
                      : "bg-[#3A3C40] text-white hover:bg-[#3A3C40]/80"
                  }`}
                >
                  PROJECTS
                </button>
              </div>

              {/* Search Inputs */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 mb-2 sm:mb-2.5">
                {/* City Dropdown */}
                <div className="flex-1 relative">
                  <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-white/90 mb-1">
                    CITY
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCityDropdown(!showCityDropdown)}
                      className="w-full h-9 sm:h-10 md:h-11 bg-white rounded-md sm:rounded-lg md:rounded-xl px-2.5 sm:px-3 md:px-4 text-left text-xs sm:text-sm md:text-base text-[#111111] font-medium flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
                    >
                      <span>{city}</span>
                      <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#3A3C40] transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showCityDropdown && (
                      <div className="absolute z-[30] w-full mt-1 bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl border border-[#E7EAEF] max-h-60 overflow-y-auto">
                        {cities.map((cityOption) => (
                          <button
                            key={cityOption}
                            type="button"
                            onClick={() => {
                              setCity(cityOption);
                              setShowCityDropdown(false);
                            }}
                            className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm md:text-base text-[#111111] hover:bg-[#FAFAFA] transition-colors flex items-center justify-between"
                          >
                            <span>{cityOption}</span>
                            {city === cityOption && (
                              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#6139DB]" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Input */}
                <div className="flex-1">
                  <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-white/90 mb-1">
                    LOCATION
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-9 sm:h-10 md:h-11 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg md:rounded-xl"
                  />
                </div>

                {/* FIND Button */}
                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    className="h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#22C55E] hover:bg-[#20B858] text-white font-bold text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto min-w-[70px] sm:min-w-[80px] md:min-w-[90px]"
                  >
                    FIND
                  </Button>
                </div>
              </div>

              {/* Additional Options */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs text-white/80 pt-0.5">
                <button className="hover:text-white transition-colors flex items-center gap-0.5 sm:gap-1">
                  <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>More Options</span>
                </button>
                <span className="text-white/40">|</span>
                <div className="relative">
                  <button
                    type="button"
                    className="hover:text-white transition-colors"
                    onClick={() => {
                      setShowCurrencyDropdown((v) => !v);
                      setShowAreaUnitDropdown(false);
                      setShowCityDropdown(false);
                    }}
                  >
                    Change Currency <span className="text-white/60">({currency})</span>
                  </button>
                  {showCurrencyDropdown && (
                    <div className="absolute z-[30] mt-2 min-w-56 bg-white rounded-xl shadow-2xl border border-[#E7EAEF] overflow-hidden">
                      {currencies.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCurrency(c.code);
                            setShowCurrencyDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left text-xs sm:text-sm text-[#111111] hover:bg-[#FAFAFA] transition-colors flex items-center justify-between"
                        >
                          <span>{c.label}</span>
                          {currency === c.code && <Check className="h-4 w-4 text-[#6139DB]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-white/40">|</span>
                <div className="relative">
                  <button
                    type="button"
                    className="hover:text-white transition-colors"
                    onClick={() => {
                      setShowAreaUnitDropdown((v) => !v);
                      setShowCurrencyDropdown(false);
                      setShowCityDropdown(false);
                    }}
                  >
                    Change Area Unit{" "}
                    <span className="text-white/60">
                      ({areaUnits.find((u) => u.value === areaUnit)?.label || areaUnit})
                    </span>
                  </button>
                  {showAreaUnitDropdown && (
                    <div className="absolute z-[30] mt-2 min-w-56 bg-white rounded-xl shadow-2xl border border-[#E7EAEF] overflow-hidden">
                      {areaUnits.map((u) => (
                        <button
                          key={u.value}
                          type="button"
                          onClick={() => {
                            setAreaUnit(u.value);
                            setShowAreaUnitDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left text-xs sm:text-sm text-[#111111] hover:bg-[#FAFAFA] transition-colors flex items-center justify-between"
                        >
                          <span>{u.label}</span>
                          {areaUnit === u.value && <Check className="h-4 w-4 text-[#6139DB]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-white/40">|</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="hover:text-white transition-colors"
                >
                  Reset Search
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>

      {/* Click outside to close dropdown */}
      {anyDropdownOpen && (
        <div
          className="fixed inset-0 z-[25]"
          onClick={() => {
            setShowCityDropdown(false);
            setShowCurrencyDropdown(false);
            setShowAreaUnitDropdown(false);
          }}
        />
      )}
    </section>
  );
}
