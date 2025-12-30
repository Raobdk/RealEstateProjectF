"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/home/hero";
import { ExploreMore } from "@/components/home/explore-more";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { MapPin, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { projectAPI, plotAPI } from "@/lib/api";

const features = [
  {
    icon: Building2,
    title: "Premium Properties",
    description: "Access to exclusive listings from verified sellers and developers.",
  },
  {
    icon: MapPin,
    title: "Location Insights",
    description: "Detailed neighborhood information and property analytics.",
  },
  {
    icon: TrendingUp,
    title: "Market Trends",
    description: "Stay updated with real-time market prices and trends.",
  },
];

interface Project {
  _id: string;
  name: string;
  code: string;
  location: {
    city: string;
    area?: string;
  };
  status: string;
  totalAreaMarla: number;
  pricing?: {
    minPrice?: number;
    maxPrice?: number;
  };
}

interface PlotData {
  _id: string;
  plotNo: string;
  sizeMarla: number;
  price: number;
  status: string;
  features?: {
    corner?: boolean;
    parkFacing?: boolean;
  };
}

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [projectPlots, setProjectPlots] = useState<Record<string, PlotData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setError(null);
        // Fetch active projects (all statuses, not just ongoing)
        const response = await projectAPI.getAll({ limit: 6 });
        const projects = response.data.data.projects.slice(0, 6);
        setFeaturedProjects(projects);

        // Fetch plots for each project to show available plots
        const plotsData: Record<string, PlotData[]> = {};
        for (const project of projects) {
          try {
            const plotsResponse = await plotAPI.getAll({ 
              projectId: project._id, 
              status: "available",
              limit: 1
            });
            plotsData[project._id] = plotsResponse.data.data.plots;
          } catch (err) {
            plotsData[project._id] = [];
          }
        }
        setProjectPlots(plotsData);
      } catch (error: any) {
        console.error("Failed to fetch projects:", error);
        setError("Unable to load projects. Please try again later.");
        setFeaturedProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Properties */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60">
              Featured Listings
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
              Explore <GradientText>Landora Projects</GradientText>
            </h2>
            <p className="text-[#3A3C40] max-w-2xl mx-auto">
              Live premium properties across Pakistan's top cities from our database.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" text="Loading projects..." />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#111111] mb-2">Unable to Load Projects</h3>
                <p className="text-[#3A3C40] mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#111111] mb-2">No Projects Available</h3>
                <p className="text-[#3A3C40] mb-4">Check back soon for new listings!</p>
                <Button asChild variant="gradient">
                  <Link href="/auth/register">Get Notified</Link>
                </Button>
              </div>
            </div>
          ) : (
            <AnimatedSection
              variant="slideUp"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {featuredProjects.map((project) => {
                const plots = projectPlots[project._id] || [];
                const samplePlot = plots[0];
                const priceDisplay = samplePlot
                  ? `PKR ${(samplePlot.price / 1000000).toFixed(1)}M`
                  : project.pricing?.minPrice
                  ? `PKR ${(project.pricing.minPrice / 1000000).toFixed(1)}M+`
                  : "Contact for Price";

                const features = [];
                if (project.totalAreaMarla) {
                  features.push(`${project.totalAreaMarla} Marla Total`);
                }
                if (samplePlot) {
                  features.push(`${samplePlot.sizeMarla} Marla Plots`);
                  if (samplePlot.features?.corner) features.push("Corner");
                  if (samplePlot.features?.parkFacing) features.push("Park-Facing");
                }

                return (
                  <Card
                    key={project._id}
                    className="flex flex-col bg-white border border-[#E7EAEF] rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <p className="text-xs uppercase tracking-widest text-[#3A3C40]/60">
                        {project.code || project._id.slice(-6).toUpperCase()}
                      </p>
                      <CardTitle className="text-xl text-[#111111]">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 text-sm text-[#3A3C40] flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#6139DB]" />
                        {project.location.city}
                        {project.location.area && `, ${project.location.area}`}
                      </div>
                      {features.length > 0 && (
                        <p className="text-sm">{features.join(" • ")}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          project.status === "ongoing"
                            ? "bg-green-100 text-green-700"
                            : project.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-2xl font-semibold text-[#111111] mt-auto">
                        {priceDisplay}
                      </p>
                      <Button variant="outline" className="mt-2" asChild>
                        <Link href={`/properties?project=${project._id}`}>
                          View Plots
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </AnimatedSection>
          )}

          <AnimatedSection variant="fadeIn" className="text-center mt-12">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </AnimatedSection>
        </Container>
      </section>

      {/* Explore More Section */}
      <ExploreMore />

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFA]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
              Your Trusted <GradientText>Real Estate</GradientText> Partner
            </h2>
          </AnimatedSection>

          <AnimatedSection
            variant="slideUp"
            className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border border-[#E7EAEF] rounded-2xl text-center"
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#6139DB]/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-[#6139DB]" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3A3C40]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-4 sm:space-y-6 text-white max-w-3xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              Join thousands of satisfied customers who found their perfect home with Landora.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60">
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
              Contact <GradientText>Landora</GradientText>
            </h2>
            <p className="text-[#3A3C40] max-w-2xl mx-auto">
              Have questions? Our team is here to help you find the perfect property.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="bg-[#FAFAFA] border-[#E7EAEF] text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#6139DB]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#6139DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111111] mb-2">Phone</h3>
                <p className="text-[#3A3C40] text-sm">+92 300 1234567</p>
                <p className="text-[#3A3C40] text-sm">Mon-Sat 9AM-6PM</p>
              </CardContent>
            </Card>

            <Card className="bg-[#FAFAFA] border-[#E7EAEF] text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#6139DB]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#6139DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111111] mb-2">Email</h3>
                <p className="text-[#3A3C40] text-sm">info@landora.com</p>
                <p className="text-[#3A3C40] text-sm">support@landora.com</p>
              </CardContent>
            </Card>

            <Card className="bg-[#FAFAFA] border-[#E7EAEF] text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#6139DB]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-[#6139DB]" />
                </div>
                <h3 className="font-semibold text-[#111111] mb-2">Office</h3>
                <p className="text-[#3A3C40] text-sm">DHA Phase 5, Lahore</p>
                <p className="text-[#3A3C40] text-sm">Pakistan</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}

