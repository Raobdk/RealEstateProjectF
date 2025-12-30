"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { plotAPI, projectAPI } from "@/lib/api";

interface Project {
  _id: string;
  name: string;
  location: {
    city: string;
  };
}

export default function NewPlotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    projectId: "",
    plotNo: "",
    sizeMarla: "",
    block: "",
    phase: "",
    status: "available",
    price: "",
    corner: false,
    parkFacing: false,
    mainRoad: false,
    direction: "",
    notes: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectAPI.getAll();
        setProjects(response.data.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const plotData = {
        projectId: formData.projectId,
        plotNo: formData.plotNo,
        sizeMarla: Number(formData.sizeMarla),
        block: formData.block || undefined,
        phase: formData.phase || undefined,
        status: formData.status,
        price: Number(formData.price),
        features: {
          corner: formData.corner,
          parkFacing: formData.parkFacing,
          mainRoad: formData.mainRoad,
          direction: formData.direction || undefined,
        },
        notes: formData.notes || undefined,
      };

      await plotAPI.create(plotData);
      alert("Plot created successfully!");
      router.push("/admin/plots");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Failed to create plot:", error);
      alert(err.response?.data?.message || "Failed to create plot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatedSection variant="slideUp">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/plots">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Plots
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#111111]">Add New Plot</h1>
            <p className="text-[#3A3C40] mt-1">Add a new plot to a project</p>
          </div>
        </div>
      </AnimatedSection>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential plot details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">Project *</Label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6139DB]"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name} - {project.location.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plotNo">Plot Number *</Label>
                  <Input
                    id="plotNo"
                    name="plotNo"
                    value={formData.plotNo}
                    onChange={handleChange}
                    placeholder="e.g., 123"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sizeMarla">Size (Marla) *</Label>
                  <Input
                    id="sizeMarla"
                    name="sizeMarla"
                    type="number"
                    step="0.01"
                    value={formData.sizeMarla}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="block">Block</Label>
                  <Input
                    id="block"
                    name="block"
                    value={formData.block}
                    onChange={handleChange}
                    placeholder="e.g., A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phase">Phase</Label>
                  <Input
                    id="phase"
                    name="phase"
                    value={formData.phase}
                    onChange={handleChange}
                    placeholder="e.g., 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6139DB]"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="blocked">Blocked</option>
                    <option value="disputed">Disputed</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (PKR) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 5000000"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Features */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Plot Features</CardTitle>
              <CardDescription>Special features and characteristics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="corner"
                    name="corner"
                    checked={formData.corner}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#6139DB] border-gray-300 rounded focus:ring-[#6139DB]"
                  />
                  <Label htmlFor="corner" className="cursor-pointer">Corner Plot</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="parkFacing"
                    name="parkFacing"
                    checked={formData.parkFacing}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#6139DB] border-gray-300 rounded focus:ring-[#6139DB]"
                  />
                  <Label htmlFor="parkFacing" className="cursor-pointer">Park Facing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="mainRoad"
                    name="mainRoad"
                    checked={formData.mainRoad}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#6139DB] border-gray-300 rounded focus:ring-[#6139DB]"
                  />
                  <Label htmlFor="mainRoad" className="cursor-pointer">Main Road</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direction">Direction</Label>
                  <select
                    id="direction"
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6139DB]"
                  >
                    <option value="">Select direction</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="northeast">North-East</option>
                    <option value="northwest">North-West</option>
                    <option value="southeast">South-East</option>
                    <option value="southwest">South-West</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional information about the plot"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Submit Button */}
        <AnimatedSection variant="slideUp">
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" asChild disabled={loading}>
              <Link href="/admin/plots">Cancel</Link>
            </Button>
            <Button type="submit" className="bg-[#6139DB] hover:bg-[#6139DB]/90" disabled={loading}>
              {loading ? (
                <>
                  <ButtonLoader className="mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Plot
                </>
              )}
            </Button>
          </div>
        </AnimatedSection>
      </form>
    </div>
  );
}
