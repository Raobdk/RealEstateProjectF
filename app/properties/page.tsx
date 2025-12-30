"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Loader } from "@/components/ui/loader";
import { Container } from "@/components/layout/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2 } from "lucide-react";
import { listingAPI, projectAPI } from "@/lib/api";

type PropertyType = "buy" | "rent" | "projects";
type Currency = "PKR" | "USD" | "AED" | "SAR";
type AreaUnit = "marla" | "kanal" | "square-feet";

const AREA_UNIT_LABEL: Record<AreaUnit, string> = {
  marla: "Marla",
  kanal: "Kanal",
  "square-feet": "Square Feet",
};

// Approx exchange rates based on PKR (client-side for display)
// If you want exact rates, we can wire a backend endpoint later.
const PKR_TO: Record<Currency, number> = {
  PKR: 1,
  USD: 1 / 280, // ~280 PKR = 1 USD
  AED: 1 / 76, // ~76 PKR = 1 AED
  SAR: 1 / 75, // ~75 PKR = 1 SAR
};

function formatPriceFromPKR(pricePKR: number, currency: Currency) {
  if (!Number.isFinite(pricePKR)) return "Price on call";
  if (currency === "PKR") return `PKR ${Math.round(pricePKR).toLocaleString()}`;
  const converted = pricePKR * (PKR_TO[currency] || 1);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(converted);
  } catch {
    return `${currency} ${Math.round(converted).toLocaleString()}`;
  }
}

function toMarla(value: number, unit: AreaUnit): number {
  if (!Number.isFinite(value)) return 0;
  if (unit === "marla") return value;
  if (unit === "kanal") return value * 20;
  // square-feet
  return value / 272.25;
}

function fromMarla(marla: number, unit: AreaUnit): number {
  if (!Number.isFinite(marla)) return 0;
  if (unit === "marla") return marla;
  if (unit === "kanal") return marla / 20;
  // square-feet
  return marla * 272.25;
}

function formatArea(value: number, fromUnit: AreaUnit, toUnit: AreaUnit) {
  const marla = toMarla(value, fromUnit);
  const out = fromMarla(marla, toUnit);
  const decimals = toUnit === "square-feet" ? 0 : 2;
  const rounded =
    toUnit === "square-feet" ? Math.round(out) : Number(out.toFixed(decimals));
  const suffix = toUnit === "square-feet" ? "sq ft" : toUnit;
  return `${rounded.toLocaleString()} ${suffix}`;
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = useState<PropertyType>("buy");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState<Currency>("PKR");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("marla");
  const [listings, setListings] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read search params from URL (set by hero search)
  useEffect(() => {
    const typeParam = (searchParams.get("type") as PropertyType) || "buy";
    const cityParam = searchParams.get("city") || "";
    const locationParam = searchParams.get("location") || "";
    const currencyParam = (searchParams.get("currency") as Currency) || "PKR";
    const areaUnitParam = (searchParams.get("areaUnit") as AreaUnit) || "marla";
    setPropertyType(typeParam);
    setCity(cityParam);
    setLocation(locationParam);
    setCurrency(currencyParam);
    setAreaUnit(areaUnitParam);
  }, [searchParams]);

  // Fetch data based on property type and filters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (propertyType === "projects") {
          // Fetch all projects without city filter, we'll filter client-side
          const res = await projectAPI.getAll();
          setProjects(res.data.data.projects || res.data.data || []);
        } else {
          const res = await listingAPI.getAll(city ? { city } : undefined);
          setListings(res.data.data.listings || res.data.data || []);
        }
      } catch (err: any) {
        console.error("Failed to fetch properties:", err);
        setError(err.response?.data?.message || "Unable to load properties. Please check your connection and try again.");
        setListings([]);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyType, city]);

  const filteredListings = useMemo(() => {
    if (propertyType === "projects") return [];
    return listings.filter((item) => {
      const matchesCity = city
        ? (item.location?.city || "").toLowerCase() === city.toLowerCase()
        : true;
      const matchesLocation = location
        ? `${item.location?.city || ""} ${item.location?.area || ""} ${item.location?.address || ""} ${item.title || ""}`
            .toLowerCase()
            .includes(location.toLowerCase())
        : true;
      return matchesCity && matchesLocation;
    });
  }, [listings, city, location, propertyType]);

  const filteredProjects = useMemo(() => {
    if (propertyType !== "projects") return [];
    return projects.filter((proj) => {
      const matchesCity = city
        ? proj.location?.city?.toLowerCase() === city.toLowerCase()
        : true;
      const matchesLocation = location
        ? `${proj.name || ""} ${proj.location?.area || ""} ${proj.location?.address || ""}`
            .toLowerCase()
            .includes(location.toLowerCase())
        : true;
      return matchesCity && matchesLocation;
    });
  }, [projects, city, location, propertyType]);

  const showProjects = propertyType === "projects";
  const resultsCount = showProjects ? filteredProjects.length : filteredListings.length;

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Container className="space-y-6 sm:space-y-8 md:space-y-10">
        <AnimatedSection variant="slideUp" className="space-y-3 sm:space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60">Browse</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">
            Explore <GradientText>Premium Properties</GradientText>
          </h1>
          <p className="text-[#3A3C40] max-w-3xl mx-auto">
            Filter premium projects, compare plot metadata, and find your perfect property.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#E7EAEF]">
              <span className="text-sm text-[#3A3C40]">Results:</span>
              <span className="font-semibold text-[#6139DB]">{resultsCount}</span>
            </div>
            {city && (
              <div className="inline-flex items-center gap-2 bg-[#6139DB]/10 px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-[#6139DB]" />
                <span className="text-sm font-medium text-[#6139DB]">{city}</span>
              </div>
            )}
            {location && (
              <div className="inline-flex items-center gap-2 bg-[#6139DB]/10 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-[#6139DB]">{location}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#3A3C40]/70">
            <span>Currency: <span className="font-semibold text-[#111111]">{currency}</span></span>
            <span>•</span>
            <span>Area Unit: <span className="font-semibold text-[#111111]">{AREA_UNIT_LABEL[areaUnit] || areaUnit}</span></span>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader size="lg" text="Loading properties..." />
          </div>
        ) : error ? (
          <AnimatedSection variant="slideUp" className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">Failed to Load Properties</h3>
              <p className="text-[#3A3C40] mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </AnimatedSection>
        ) : resultsCount === 0 ? (
          <AnimatedSection variant="slideUp" className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">No Properties Found</h3>
              <p className="text-[#3A3C40] mb-4">
                {city || location ? "Try adjusting your search filters" : "No properties available at the moment"}
              </p>
              <div className="flex gap-3 justify-center">
                {(city || location) && (
                  <Button onClick={() => { setCity(""); setLocation(""); }} variant="outline">
                    Clear Filters
                  </Button>
                )}
                <Button asChild variant="gradient">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        ) : showProjects ? (
          <AnimatedSection variant="slideUp" className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="flex flex-col bg-white border border-[#E7EAEF] rounded-2xl overflow-hidden">
                {/* Project Image */}
                {project.images && project.images.length > 0 && (
                  <div className="relative h-48 w-full">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${project.images.find((img: any) => img.type === 'main')?.url || project.images[0]?.url}`}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800';
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-[#6139DB] text-white text-xs px-2 py-1 rounded">
                      {project.status || 'planning'}
                    </div>
                  </div>
                )}
                <CardHeader>
                  <p className="text-xs uppercase tracking-widest text-[#3A3C40]/60">
                    {project.code || project._id}
                  </p>
                  <CardTitle className="text-2xl text-[#111111]">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-[#3A3C40] flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#6139DB]" />
                    {project.location?.city || "Unknown City"}
                  </div>
                  {Number.isFinite(project.totalAreaMarla) && (
                    <p>
                      Area:{" "}
                      <span className="font-semibold text-[#111111]">
                        {formatArea(Number(project.totalAreaMarla), "marla", areaUnit)}
                      </span>
                    </p>
                  )}
                  {(Number.isFinite(project.pricing?.minPrice) || Number.isFinite(project.pricing?.maxPrice)) && (
                    <p>
                      Price Range:{" "}
                      <span className="font-semibold text-[#111111]">
                        {Number.isFinite(project.pricing?.minPrice)
                          ? formatPriceFromPKR(Number(project.pricing.minPrice), currency)
                          : "—"}{" "}
                        -{" "}
                        {Number.isFinite(project.pricing?.maxPrice)
                          ? formatPriceFromPKR(Number(project.pricing.maxPrice), currency)
                          : "—"}
                      </span>
                    </p>
                  )}
                  <p>{project.details?.description || "Project details coming soon."}</p>
                  <Button variant="gradient" className="mt-auto" asChild>
                    <Link href={`/projects/${project._id}`}>View details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        ) : (
          <AnimatedSection variant="slideUp" className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <Card key={listing._id || listing.id} className="flex flex-col bg-white border border-[#E7EAEF] rounded-2xl">
                <CardHeader>
                  <p className="text-xs uppercase tracking-widest text-[#3A3C40]/60">
                    {listing.listingId || listing.id || listing._id}
                  </p>
                  <CardTitle className="text-2xl text-[#111111]">
                    {listing.title || listing.name || "Listing"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-[#3A3C40] flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#6139DB]" />
                    {listing.location?.city
                      ? `${listing.location.city}${listing.location.area ? `, ${listing.location.area}` : ""}`
                      : "Unknown Location"}
                  </div>
                  <p>{listing.description || listing.meta || "No description available."}</p>
                  {(Number.isFinite(listing.area?.value) || Number.isFinite(listing.plotId?.sizeMarla)) && (
                    <p>
                      Area:{" "}
                      <span className="font-semibold text-[#111111]">
                        {Number.isFinite(listing.area?.value)
                          ? formatArea(
                              Number(listing.area.value),
                              (listing.area.unit as AreaUnit) || "marla",
                              areaUnit
                            )
                          : formatArea(Number(listing.plotId.sizeMarla), "marla", areaUnit)}
                      </span>
                    </p>
                  )}
                  <p className="text-2xl font-semibold text-[#111111]">
                    {Number.isFinite(listing.price)
                      ? formatPriceFromPKR(Number(listing.price), currency)
                      : listing.priceLabel || "Price on call"}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/properties/${(listing._id || listing.id || "detail").toString()}`}>
                        View details
                      </Link>
                    </Button>
                    {listing.projectId && (
                      <Button variant="ghost" size="sm" className="gap-1" asChild>
                        <Link href={`/projects/${listing.projectId._id || listing.projectId}`}>
                          <Building2 className="w-4 h-4" />
                          Project
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        )}
      </Container>
    </div>
  );
}

