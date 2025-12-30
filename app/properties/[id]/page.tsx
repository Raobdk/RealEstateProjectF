"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MapPin, ShieldCheck, Loader2 } from "lucide-react";
import { listingAPI } from "@/lib/api";

interface PropertyDetailProps {
  params: { id: string };
}

export default function PropertyDetailPage({ params }: PropertyDetailProps) {
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await listingAPI.getById(params.id);
        setListing(response.data.data.listing || response.data.data);
      } catch (err: any) {
        console.error("Failed to fetch listing:", err);
        setError(err.response?.data?.message || "Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#6139DB]" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="py-24">
        <Container className="text-center space-y-4">
          <p className="text-[#3A3C40]">
            {error || "This property was not found."}
          </p>
          <Button asChild variant="outline">
            <Link href="/properties">Back to properties</Link>
          </Button>
        </Container>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (!Number.isFinite(price)) return "Price on call";
    return `PKR ${Math.round(price).toLocaleString()}`;
  };

  const formatArea = (value: number, unit: string = "marla") => {
    if (!Number.isFinite(value)) return "Area not specified";
    return `${value.toLocaleString()} ${unit}`;
  };

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Container className="space-y-6 sm:space-y-8 md:space-y-10">
        <AnimatedSection variant="slideUp">
          <Button variant="ghost" asChild>
            <Link href="/properties">← Back to properties</Link>
          </Button>
        </AnimatedSection>
        <AnimatedSection variant="slideUp">
          <Card className="bg-white border border-[#E7EAEF] rounded-2xl">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl text-[#111111]">
                  {listing.title || listing.name || "Property Listing"}
                </CardTitle>
                <span className="text-sm px-3 py-1 rounded-full bg-[#6139DB]/10 text-[#6139DB] font-medium">
                  {listing.status || "available"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#3A3C40]">
                <MapPin className="w-4 h-4 text-[#6139DB]" />
                {listing.location?.city || "Unknown Location"}
                {listing.location?.area && `, ${listing.location.area}`}
              </div>
              {listing.listingId && (
                <p className="text-xs text-[#3A3C40]/60">ID: {listing.listingId}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4 text-[#3A3C40]">
              <p className="text-base leading-relaxed">
                {listing.description || listing.meta || "No description available."}
              </p>
              
              {(Number.isFinite(listing.area?.value) || Number.isFinite(listing.plotId?.sizeMarla)) && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#111111]">Area:</span>
                  <span>
                    {Number.isFinite(listing.area?.value)
                      ? formatArea(listing.area.value, listing.area.unit || "marla")
                      : formatArea(listing.plotId?.sizeMarla, "marla")}
                  </span>
                </div>
              )}
              
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#111111]">
                {Number.isFinite(listing.price)
                  ? formatPrice(listing.price)
                  : listing.priceLabel || "Price on call"}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient">Request Hold</Button>
                <Button variant="outline">Schedule Visit</Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Contact Agent</Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-[#3A3C40] pt-4 border-t border-[#E7EAEF]">
                <ShieldCheck className="w-4 h-4 text-[#6139DB]" />
                Verified inventory • Transfer-ready
              </div>
              
              {listing.projectId && (
                <div className="mt-4">
                  <Button variant="ghost" asChild>
                    <Link href={`/projects/${listing.projectId._id || listing.projectId}`}>
                      View Project Details →
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      </Container>
    </div>
  );
}


