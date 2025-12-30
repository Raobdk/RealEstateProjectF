"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageLoader } from "@/components/ui/loader";
import { Plus, Search, Edit, MoreVertical, Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/hooks/use-projects";
import { plotAPI } from "@/lib/api";

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [projectStats, setProjectStats] = useState<Record<string, { total: number; sold: number }>>({});

  // Fetch plot stats for each project
  useEffect(() => {
    const fetchStats = async () => {
      const stats: Record<string, { total: number; sold: number }> = {};
      for (const project of projects) {
        try {
          const response = await plotAPI.getAll({ projectId: project._id });
          const plots = response.data.data.plots;
          stats[project._id] = {
            total: plots.length,
            sold: plots.filter((p: any) => p.status === "sold").length,
          };
        } catch (err) {
          stats[project._id] = { total: 0, sold: 0 };
        }
      }
      setProjectStats(stats);
    };
    if (projects.length > 0) {
      fetchStats();
    }
  }, [projects]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <PageLoader text="Loading projects..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Project Management</h1>
            <p className="text-[#3A3C40] mt-1">Create and manage real estate projects</p>
          </div>
          <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90" asChild>
            <Link href="/admin/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Search */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3A3C40]/60" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection variant="slideUp" className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const stats = projectStats[project._id] || { total: 0, sold: 0 };
          const progress = stats.total > 0 ? Math.round((stats.sold / stats.total) * 100) : 0;
          
          return (
            <Card key={project._id} className="bg-white border-[#E7EAEF] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-[#111111] mb-1">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
                      <MapPin className="h-4 w-4" />
                      {project.location.city}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#3A3C40]">Progress</span>
                  <span className="font-semibold text-[#111111]">{progress}%</span>
                </div>
                <div className="w-full bg-[#E7EAEF] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#6139DB] to-[#6139DB]/80 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-xs text-[#3A3C40] mb-1">Total Plots</p>
                    <p className="text-lg font-bold text-[#111111]">{stats.total}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#3A3C40] mb-1">Sold</p>
                    <p className="text-lg font-bold text-[#6139DB]">{stats.sold}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/admin/projects/${project._id}`}>View Details</Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/projects/${project._id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </AnimatedSection>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-[#3A3C40]/40 mx-auto mb-4" />
          <p className="text-[#3A3C40]">No projects found</p>
        </div>
      )}
    </div>
  );
}
