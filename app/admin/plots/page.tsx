"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageLoader } from "@/components/ui/loader";
import { Plus, Search, MapPin } from "lucide-react";
import { usePlots } from "@/hooks/use-plots";
import { useProjects } from "@/hooks/use-projects";
import Link from "next/link";

type PlotStatus = "available" | "sold" | "blocked" | "disputed" | "reserved";

const statusColors: Record<PlotStatus, string> = {
  available: "bg-green-100 text-green-800",
  sold: "bg-blue-100 text-blue-800",
  blocked: "bg-yellow-100 text-yellow-800",
  disputed: "bg-red-100 text-red-800",
  reserved: "bg-purple-100 text-purple-800",
};

export default function PlotsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<PlotStatus | "all">("all");
  const [selectedProject, setSelectedProject] = useState<string>("all");
  
  const { plots, loading, error } = usePlots();
  const { projects } = useProjects();

  const filteredPlots = plots.filter(
    (plot) =>
      (plot.plotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.projectId?.name?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedStatus === "all" || plot.status === selectedStatus) &&
      (selectedProject === "all" || plot.projectId?._id === selectedProject)
  );

  if (loading) {
    return <PageLoader text="Loading plots..." />;
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Plot Management</h1>
            <p className="text-[#3A3C40] mt-1">Manage plots across all projects</p>
          </div>
          <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90" asChild>
            <Link href="/admin/plots/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Plot
            </Link>
          </Button>
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
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as PlotStatus | "all")}
                className="px-4 py-2 border border-[#E7EAEF] rounded-xl bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="blocked">Blocked</option>
                <option value="disputed">Disputed</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Plots Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">
              Plots ({filteredPlots.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plot No</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Size (Marla)</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlots.map((plot) => (
                    <TableRow key={plot._id}>
                      <TableCell className="font-medium">{plot.plotNo}</TableCell>
                      <TableCell>{plot.projectId?.name || "N/A"}</TableCell>
                      <TableCell>{plot.block || "-"}</TableCell>
                      <TableCell>{plot.sizeMarla}</TableCell>
                      <TableCell>PKR {plot.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[plot.status as PlotStatus] || statusColors.available}`}
                        >
                          {plot.status}
                        </span>
                      </TableCell>
                      <TableCell>{plot.buyerId?.name || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredPlots.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-[#3A3C40]/40 mx-auto mb-4" />
                <p className="text-[#3A3C40]">No plots found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
