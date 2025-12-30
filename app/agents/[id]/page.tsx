"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Home,
  TrendingUp,
  Award,
  Calendar,
  ChevronLeft,
  AlertCircle,
  Building2,
} from "lucide-react";
import { userAPI, listingAPI } from "@/lib/api";

interface AgentDetail {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profile?: {
    bio?: string;
    specializations?: string[];
    languages?: string[];
    experience?: number;
    location?: string;
  };
  stats?: {
    totalListings?: number;
    activeListings?: number;
    soldProperties?: number;
    totalRevenue?: number;
  };
  createdAt: string;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  currency: string;
  location: {
    city: string;
    area: string;
  };
  features: {
    area: number;
    areaUnit: string;
    bedrooms?: number;
    bathrooms?: number;
  };
  type: string;
  category: string;
  images: string[];
  status: string;
}

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params?.id as string;

  const [agent, setAgent] = useState<AgentDetail | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingProperties, setLoadingProperties] = useState(true);

  useEffect(() => {
    if (agentId) {
      fetchAgentDetails();
      fetchAgentProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const fetchAgentDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await userAPI.getById(agentId);
      setAgent(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agent details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentProperties = async () => {
    try {
      setLoadingProperties(true);
      const response = await listingAPI.getAll({ agentId: agentId });
      setProperties(response.data?.listings || []);
    } catch (err) {
      console.error("Failed to load agent properties", err);
    } finally {
      setLoadingProperties(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === "PKR") {
      const crore = Math.floor(price / 10000000);
      const lakh = Math.floor((price % 10000000) / 100000);
      if (crore > 0) {
        return `${crore}.${lakh} Crore`;
      }
      return `${lakh} Lakh`;
    }
    return new Intl.NumberFormat("en-US").format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#6139DB] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#3A3C40]">Loading agent details...</p>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Container>
          <Card className="max-w-md mx-auto text-center border-[#E7EAEF]">
            <CardContent className="py-16">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#111111] mb-2">Agent Not Found</h2>
              <p className="text-[#3A3C40] mb-6">
                {error || "The agent you're looking for doesn't exist or has been removed."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => router.back()} variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  onClick={() => router.push("/agents")}
                  className="bg-[#6139DB] hover:bg-[#6139DB]/90"
                >
                  Browse Agents
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  const stats = agent.stats || {};

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b border-[#E7EAEF]">
        <Container>
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <Link href="/" className="hover:text-[#6139DB]">
              Home
            </Link>
            <span>/</span>
            <Link href="/agents" className="hover:text-[#6139DB]">
              Agents
            </Link>
            <span>/</span>
            <span className="text-[#111111]">{agent.name}</span>
          </div>
        </Container>
      </section>

      {/* Agent Profile Header */}
      <section className="py-12 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-white">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-[#6139DB] text-white flex items-center justify-center text-5xl font-bold flex-shrink-0">
                {agent.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold">{agent.name}</h1>
                    <Badge className="bg-[#6139DB]">{agent.role}</Badge>
                    <Badge variant="outline" className="text-white border-white">
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-white/80">Real Estate Professional</p>
                </div>

                {agent.profile?.bio && (
                  <p className="text-white/90 max-w-2xl">{agent.profile.bio}</p>
                )}

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>{agent.email}</span>
                  </div>
                  {agent.profile?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{agent.profile.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12">
        <Container>
          <AnimatedSection variant="slideUp">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-[#E7EAEF]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6139DB]/10 flex items-center justify-center">
                      <Home className="w-6 h-6 text-[#6139DB]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111]">
                        {stats.totalListings || 0}
                      </p>
                      <p className="text-sm text-[#3A3C40]">Total Listings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E7EAEF]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111]">
                        {stats.activeListings || 0}
                      </p>
                      <p className="text-sm text-[#3A3C40]">Active Listings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E7EAEF]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111]">
                        {stats.soldProperties || 0}
                      </p>
                      <p className="text-sm text-[#3A3C40]">Sold Properties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E7EAEF]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#111111]">
                        {agent.profile?.experience || 0}+
                      </p>
                      <p className="text-sm text-[#3A3C40]">Years Experience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Agent Details */}
      <section className="py-8">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <AnimatedSection variant="slideUp">
                <Card className="border-[#E7EAEF]">
                  <CardHeader>
                    <CardTitle>About {agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#3A3C40] mb-4">
                      {agent.profile?.bio ||
                        "This agent is a dedicated real estate professional committed to helping clients find their perfect property."}
                    </p>

                    {agent.profile?.specializations && agent.profile.specializations.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-[#111111] mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.profile.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.profile?.languages && agent.profile.languages.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-[#111111] mb-2">Languages:</h4>
                        <p className="text-[#3A3C40]">
                          {agent.profile.languages.join(", ")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Properties */}
              <AnimatedSection variant="slideUp" delay={0.1}>
                <Card className="border-[#E7EAEF]">
                  <CardHeader>
                    <CardTitle>Current Listings ({properties.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingProperties ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-24 bg-gray-200 rounded" />
                          </div>
                        ))}
                      </div>
                    ) : properties.length === 0 ? (
                      <div className="text-center py-8 text-[#3A3C40]">
                        <Building2 className="w-12 h-12 mx-auto mb-3 text-[#3A3C40]/30" />
                        <p>No active listings at the moment</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {properties.slice(0, 6).map((property) => (
                          <Link key={property._id} href={`/properties/${property._id}`}>
                            <div className="group flex gap-4 p-4 border border-[#E7EAEF] rounded-lg hover:shadow-md transition-shadow">
                              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                                {property.images[0] ? (
                                  <Image
                                    src={property.images[0]}
                                    alt={property.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform"
                                  />
                                ) : (
                                  <Building2 className="w-full h-full p-4 text-[#3A3C40]/30" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-[#111111] group-hover:text-[#6139DB] transition-colors truncate">
                                  {property.title}
                                </h4>
                                <p className="text-sm text-[#3A3C40] truncate">
                                  {property.location.area}, {property.location.city}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-[#3A3C40]">
                                  <span>
                                    {property.features.area} {property.features.areaUnit}
                                  </span>
                                  {property.features.bedrooms && (
                                    <span>{property.features.bedrooms} Beds</span>
                                  )}
                                  <Badge variant="outline" className="ml-auto">
                                    {property.status}
                                  </Badge>
                                </div>
                                <p className="text-lg font-bold text-[#6139DB] mt-2">
                                  {property.currency} {formatPrice(property.price, property.currency)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}

                        {properties.length > 6 && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push(`/properties?agent=${agentId}`)}
                          >
                            View All Listings
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <AnimatedSection variant="slideUp">
                <Card className="border-[#E7EAEF] sticky top-4">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#6139DB] mt-0.5" />
                        <div>
                          <p className="text-sm text-[#3A3C40]">Phone</p>
                          <p className="font-medium text-[#111111]">{agent.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#6139DB] mt-0.5" />
                        <div>
                          <p className="text-sm text-[#3A3C40]">Email</p>
                          <p className="font-medium text-[#111111] break-all">
                            {agent.email}
                          </p>
                        </div>
                      </div>

                      {agent.profile?.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#6139DB] mt-0.5" />
                          <div>
                            <p className="text-sm text-[#3A3C40]">Location</p>
                            <p className="font-medium text-[#111111]">
                              {agent.profile.location}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#6139DB] mt-0.5" />
                        <div>
                          <p className="text-sm text-[#3A3C40]">Member Since</p>
                          <p className="font-medium text-[#111111]">
                            {new Date(agent.createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E7EAEF] space-y-2">
                      <Button className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
