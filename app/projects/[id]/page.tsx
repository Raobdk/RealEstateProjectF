"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/ui/loader";
import { ArrowLeft, MapPin, Ruler, DollarSign, Building2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projectAPI } from "@/lib/api";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectAPI.getById(params.id as string);
        setProject(response.data.data.project);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return <PageLoader text="Loading project details..." />;
  }

  if (error || !project) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-[#3A3C40]/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Project Not Found</h2>
          <p className="text-[#3A3C40] mb-6">{error || "The project you're looking for doesn't exist."}</p>
          <Button asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </Container>
    );
  }

  const mainImage = project.images?.find((img: any) => img.type === 'main') || project.images?.[0];
  const galleryImages = project.images || [];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Container className="py-8">
        {/* Back Button */}
        <AnimatedSection variant="slideUp">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <AnimatedSection variant="slideUp">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${galleryImages[selectedImage]?.url}`}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200';
                        }}
                      />
                    </div>
                    {galleryImages.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 p-4">
                        {galleryImages.map((image: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                              selectedImage === index ? 'border-[#6139DB]' : 'border-transparent'
                            }`}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${image.url}`}
                              alt={`${project.name} - ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400';
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}

            {/* Project Details */}
            <AnimatedSection variant="slideUp">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-[#111111] mb-2">{project.name}</h1>
                      <div className="flex items-center gap-2 text-[#3A3C40]">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location?.city}</span>
                        {project.location?.area && <span>• {project.location.area}</span>}
                      </div>
                    </div>
                    <div className="bg-[#6139DB]/10 text-[#6139DB] px-3 py-1 rounded-full text-sm font-medium">
                      {project.status}
                    </div>
                  </div>

                  {project.code && (
                    <p className="text-sm text-[#3A3C40] mb-4">Project Code: {project.code}</p>
                  )}

                  {project.details?.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#111111] mb-2">About This Project</h3>
                      <p className="text-[#3A3C40] leading-relaxed">{project.details.description}</p>
                    </div>
                  )}

                  {project.location?.address && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#111111] mb-2">Location</h3>
                      <p className="text-[#3A3C40]">{project.location.address}</p>
                    </div>
                  )}

                  {project.details?.developer && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#111111] mb-2">Developer</h3>
                      <p className="text-[#3A3C40]">{project.details.developer}</p>
                    </div>
                  )}

                  {project.details?.features && project.details.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#111111] mb-3">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.details.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-[#3A3C40]">
                            <Check className="h-4 w-4 text-[#6139DB]" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.details?.amenities && project.details.amenities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#111111] mb-3">Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.details.amenities.map((amenity: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-[#3A3C40]">
                            <Check className="h-4 w-4 text-[#6139DB]" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Information */}
            <AnimatedSection variant="slideUp">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-[#111111] mb-4">Key Information</h3>

                  <div className="flex items-center gap-3">
                    <div className="bg-[#6139DB]/10 p-3 rounded-lg">
                      <Ruler className="h-5 w-5 text-[#6139DB]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3A3C40]">Total Area</p>
                      <p className="text-lg font-semibold text-[#111111]">{project.totalAreaMarla} Marla</p>
                    </div>
                  </div>

                  {(project.pricing?.minPrice || project.pricing?.maxPrice) && (
                    <div className="flex items-center gap-3">
                      <div className="bg-[#6139DB]/10 p-3 rounded-lg">
                        <DollarSign className="h-5 w-5 text-[#6139DB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#3A3C40]">Price Range</p>
                        <p className="text-lg font-semibold text-[#111111]">
                          {project.pricing?.minPrice ? `Rs ${(project.pricing.minPrice / 1000000).toFixed(1)}M` : '—'} - {project.pricing?.maxPrice ? `Rs ${(project.pricing.maxPrice / 1000000).toFixed(1)}M` : '—'}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.pricing?.pricePerMarla && (
                    <div className="flex items-center gap-3">
                      <div className="bg-[#6139DB]/10 p-3 rounded-lg">
                        <DollarSign className="h-5 w-5 text-[#6139DB]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#3A3C40]">Price per Marla</p>
                        <p className="text-lg font-semibold text-[#111111]">Rs {(project.pricing.pricePerMarla / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </div>
  );
}
