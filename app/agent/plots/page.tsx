"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useAgentStore } from "@/hooks/use-agent-store";
import { Search, Building2, MapPin, DollarSign, UserPlus, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function AgentPlotsPage() {
  const { plots } = useAgentStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("all");

  const filteredPlots = plots.filter(
    (plot) =>
      (plot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.sector.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedProject === "all" || plot.title === selectedProject)
  );

  const projects = Array.from(new Set(plots.map((p) => p.title)));

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Assigned Projects & Plots</h1>
            <p className="text-[#3A3C40] mt-1">View and manage your assigned inventory</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3A3C40]/60" />
                <Input
                  placeholder="Search plots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-4 py-2 border border-[#E7EAEF] rounded-xl bg-white text-sm"
              >
                <option value="all">All Projects</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection variant="slideUp" className="space-y-4 sm:space-y-6">
        {projects.map((project) => {
          const projectPlots = plots.filter((p) => p.title === project);
          const availablePlots = projectPlots.filter((p) => p.status === "available").length;

          return (
            <Card key={project} className="bg-white border-[#E7EAEF]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#6139DB]/10 rounded-lg">
                      <Building2 className="h-5 w-5 text-[#6139DB]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-[#111111]">{project}</CardTitle>
                      <p className="text-sm text-[#3A3C40]">
                        {availablePlots} available plots out of {projectPlots.length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {projectPlots.map((plot) => (
                    <Card
                      key={plot.id}
                      className="bg-[#FAFAFA] border-[#E7EAEF] hover:border-[#6139DB] transition-colors"
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-[#111111]">{plot.id}</p>
                            <div className="flex items-center gap-2 text-sm text-[#3A3C40] mt-1">
                              <MapPin className="h-4 w-4" />
                              Sector {plot.sector}
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              plot.status === "available"
                                ? "bg-green-100 text-green-800"
                                : plot.status === "hold"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {plot.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-[#3A3C40]">Size</p>
                            <p className="font-semibold text-[#111111]">{plot.size}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#3A3C40]">Price</p>
                            <p className="font-semibold text-[#6139DB]">{plot.price}</p>
                          </div>
                        </div>
                        {plot.status === "available" && (
                          <Button className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90" size="sm">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Sell Plot
                          </Button>
                        )}
                        {plot.status === "hold" && (
                          <Button variant="outline" className="w-full" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Link Buyer
                          </Button>
                        )}
                        {plot.status === "allocated" && (
                          <Button variant="ghost" className="w-full" size="sm">
                            View Details
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </AnimatedSection>
    </div>
  );
}

