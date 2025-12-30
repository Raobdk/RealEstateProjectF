"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import { ChevronDown, Check } from "lucide-react";

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

export default function BuyPage() {
  const router = useRouter();
  const [city, setCity] = useState("Islamabad");
  const [location, setLocation] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [currency, setCurrency] = useState<Currency>("PKR");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("marla");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showAreaUnitDropdown, setShowAreaUnitDropdown] = useState(false);
  const [cityDropdownWidth, setCityDropdownWidth] = useState(0);
  
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const areaUnitDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (areaUnitDropdownRef.current && !areaUnitDropdownRef.current.contains(event.target as Node)) {
        setShowAreaUnitDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Measure city dropdown width
  useEffect(() => {
    if (cityDropdownRef.current) {
      setCityDropdownWidth(cityDropdownRef.current.offsetWidth);
    }
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", "buy");
    params.set("city", city);
    if (location) params.set("location", location);
    params.set("currency", currency);
    params.set("areaUnit", areaUnit);
    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setCity("Islamabad");
    setLocation("");
    setCurrency("PKR");
    setAreaUnit("marla");
    setShowCityDropdown(false);
    setShowCurrencyDropdown(false);
    setShowAreaUnitDropdown(false);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCityDropdown(false);
  };

  const handleCurrencySelect = (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency);
    setShowCurrencyDropdown(false);
  };

  const handleAreaUnitSelect = (selectedUnit: AreaUnit) => {
    setAreaUnit(selectedUnit);
    setShowAreaUnitDropdown(false);
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] lg:h-[calc(100vh-4.5rem)] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <Container className="relative z-10 h-full flex items-center justify-center py-8">
        <div className="w-full max-w-5xl mx-auto space-y-6">
          {/* Main Heading */}
          <AnimatedSection variant="slideUp" className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-4">
              Search properties for sale in Pakistan
            </h1>
          </AnimatedSection>

          {/* Search Widget */}
          <AnimatedSection variant="slideUp" delay={0.2}>
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-white/10">
              {/* Property Type - BUY is active */}
              <div className="flex gap-2.5 mb-3">
                <div className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold bg-white text-[#111111] shadow-md text-center">
                  BUY
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/rent");
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold bg-[#3A3C40] text-white hover:bg-[#3A3C40]/80 transition-all"
                >
                  RENT
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/projects");
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold bg-[#3A3C40] text-white hover:bg-[#3A3C40]/80 transition-all"
                >
                  PROJECTS
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch}>
                <div className="flex flex-col sm:flex-row gap-3 mb-2.5">
                  {/* City Dropdown */}
                  <div className="flex-1" ref={cityDropdownRef}>
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      CITY
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCityDropdown(!showCityDropdown);
                        }}
                        className="w-full h-11 bg-white rounded-xl px-4 text-left text-base text-[#111111] font-medium flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
                      >
                        <span>{city}</span>
                        <ChevronDown className={`h-5 w-5 text-[#3A3C40] transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      {showCityDropdown && (
                        <div className="fixed z-[9999] mt-2 bg-white rounded-xl shadow-2xl border border-[#E7EAEF] max-h-64 overflow-y-auto" style={{ width: cityDropdownWidth }}>
                          {cities.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCitySelect(c);
                              }}
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAFAFA] transition-colors flex items-center justify-between"
                            >
                              <span className="text-[#111111]">{c}</span>
                              {city === c && <Check className="h-4 w-4 text-[#6139DB]" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location Input */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      LOCATION
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="h-11 bg-white text-[#111111] rounded-xl border-0 text-base"
                    />
                  </div>

                  {/* Find Button */}
                  <div className="flex items-end">
                    <Button
                      type="submit"
                      className="h-11 px-8 bg-[#10B981] hover:bg-[#10B981]/90 text-white font-semibold rounded-xl text-base shadow-lg"
                    >
                      FIND
                    </Button>
                  </div>
                </div>
              </form>

              {/* More Options */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/80 pt-2 border-t border-white/10">
                {/* Currency Dropdown */}
                <div className="relative" ref={currencyDropdownRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCurrencyDropdown(!showCurrencyDropdown);
                    }}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Change Currency ({currency})
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showCurrencyDropdown && (
                    <div className="fixed z-[9999] mt-2 bg-white rounded-lg shadow-xl border border-[#E7EAEF] min-w-[150px]">
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCurrencySelect(curr.code);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[#FAFAFA] transition-colors flex items-center justify-between"
                        >
                          <span className="text-[#111111]">{curr.label}</span>
                          {currency === curr.code && <Check className="h-4 w-4 text-[#6139DB]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-white/40">|</span>

                {/* Area Unit Dropdown */}
                <div className="relative" ref={areaUnitDropdownRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAreaUnitDropdown(!showAreaUnitDropdown);
                    }}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Change Area Unit ({areaUnits.find(u => u.value === areaUnit)?.label})
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showAreaUnitDropdown && (
                    <div className="fixed z-[9999] mt-2 bg-white rounded-lg shadow-xl border border-[#E7EAEF] min-w-[180px]">
                      {areaUnits.map((unit) => (
                        <button
                          key={unit.value}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAreaUnitSelect(unit.value);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[#FAFAFA] transition-colors flex items-center justify-between"
                        >
                          <span className="text-[#111111]">{unit.label}</span>
                          {areaUnit === unit.value && <Check className="h-4 w-4 text-[#6139DB]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-white/40">|</span>

                {/* Reset Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Reset Search
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
