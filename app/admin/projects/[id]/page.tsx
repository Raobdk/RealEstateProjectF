"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageLoader, ButtonLoader } from "@/components/ui/loader";
import { ArrowLeft, Save, Upload, X, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projectAPI, fileAPI } from "@/lib/api";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; type: string; caption?: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    city: "",
    area: "",
    address: "",
    totalAreaMarla: "",
    status: "planning",
    description: "",
    developer: "",
    features: "",
    amenities: "",
    minPrice: "",
    maxPrice: "",
    pricePerMarla: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectAPI.getById(params.id as string);
        const project = response.data.data.project;

        setFormData({
          name: project.name || "",
          code: project.code || "",
          city: project.location?.city || "",
          area: project.location?.area || "",
          address: project.location?.address || "",
          totalAreaMarla: project.totalAreaMarla || "",
          status: project.status || "planning",
          description: project.details?.description || "",
          developer: project.details?.developer || "",
          features: project.details?.features?.join(", ") || "",
          amenities: project.details?.amenities?.join(", ") || "",
          minPrice: project.pricing?.minPrice || "",
          maxPrice: project.pricing?.maxPrice || "",
          pricePerMarla: project.pricing?.pricePerMarla || "",
        });

        setExistingImages(project.images || []);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        alert("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const validImages = fileArray.filter(file => file.type.startsWith('image/'));

    if (validImages.length !== fileArray.length) {
      alert("Some files were not images and have been skipped.");
    }

    setSelectedImages(prev => [...prev, ...validImages]);

    validImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const image of selectedImages) {
        const formData = new FormData();
        formData.append("file", image);

        const response = await fileAPI.upload(formData);
        if (response.data.success) {
          uploadedUrls.push(response.data.data.file.url);
        }
      }
      return uploadedUrls;
    } catch (error) {
      console.error("Failed to upload images:", error);
      throw new Error("Failed to upload images");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload new images
      const newImageUrls = await uploadImages();

      // Combine existing and new images
      const allImages = [
        ...existingImages,
        ...newImageUrls.map((url, index) => ({
          url,
          type: existingImages.length === 0 && index === 0 ? 'main' : 'gallery',
          caption: `${formData.name} - Image ${existingImages.length + index + 1}`
        }))
      ];

      const projectData = {
        name: formData.name,
        code: formData.code || undefined,
        location: {
          city: formData.city,
          area: formData.area || undefined,
          address: formData.address || undefined,
        },
        totalAreaMarla: Number(formData.totalAreaMarla),
        status: formData.status,
        details: {
          description: formData.description || undefined,
          developer: formData.developer || undefined,
          features: formData.features ? formData.features.split(",").map(f => f.trim()) : undefined,
          amenities: formData.amenities ? formData.amenities.split(",").map(a => a.trim()) : undefined,
        },
        pricing: {
          minPrice: formData.minPrice ? Number(formData.minPrice) : undefined,
          maxPrice: formData.maxPrice ? Number(formData.maxPrice) : undefined,
          pricePerMarla: formData.pricePerMarla ? Number(formData.pricePerMarla) : undefined,
        },
        images: allImages,
      };

      await projectAPI.update(params.id as string, projectData);
      alert("Project updated successfully!");
      router.push("/admin/projects");
    } catch (error) {
      console.error("Failed to update project:", error);
      const message = error instanceof Error && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data ? String(error.response.data.message) : "Failed to update project. Please try again.";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      await projectAPI.delete(params.id as string);
      alert("Project deleted successfully!");
      router.push("/admin/projects");
    } catch (error) {
      console.error("Failed to delete project:", error);
      const message = error instanceof Error && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data ? String(error.response.data.message) : "Failed to delete project. Please try again.";
      alert(message);
    }
  };

  if (loading) {
    return <PageLoader text="Loading project..." />;
  }

  return (
    <div className="space-y-6">
      <AnimatedSection variant="slideUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-[#111111]">Edit Project</h1>
              <p className="text-[#3A3C40] mt-1">Update project details</p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Project
          </Button>
        </div>
      </AnimatedSection>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Green Valley Housing"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Project Code</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., GVH-001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAreaMarla">Total Area (Marla) *</Label>
                  <Input
                    id="totalAreaMarla"
                    name="totalAreaMarla"
                    type="number"
                    value={formData.totalAreaMarla}
                    onChange={handleChange}
                    placeholder="e.g., 1000"
                    required
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
                    <option value="planning">Planning</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="developer">Developer Name</Label>
                <Input
                  id="developer"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  placeholder="e.g., Landora Developers"
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Location Details */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
              <CardDescription>Project location information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Lahore"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area/Sector</Label>
                  <Input
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g., DHA Phase 5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete address of the project"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Pricing Information */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
              <CardDescription>Set price ranges for the project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Minimum Price (PKR)</Label>
                  <Input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    value={formData.minPrice}
                    onChange={handleChange}
                    placeholder="e.g., 5000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Maximum Price (PKR)</Label>
                  <Input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    placeholder="e.g., 20000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pricePerMarla">Price per Marla (PKR)</Label>
                  <Input
                    id="pricePerMarla"
                    name="pricePerMarla"
                    type="number"
                    value={formData.pricePerMarla}
                    onChange={handleChange}
                    placeholder="e.g., 150000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Additional Details */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Features and amenities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the project"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="e.g., Gated Community, 24/7 Security, Wide Roads"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="e.g., Parks, Mosque, Community Center, Schools"
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Project Images */}
        <AnimatedSection variant="slideUp">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
              <CardDescription>Manage project images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <Label>Current Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#E7EAEF]">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${image.url}`}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {image.type === 'main' && (
                            <div className="absolute top-2 left-2 bg-[#6139DB] text-white text-xs px-2 py-1 rounded z-10">
                              Main
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Images */}
              <div className="space-y-2">
                <Label htmlFor="images">Add New Images</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("imageInput")?.click()}
                    disabled={uploadingImages}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Images
                  </Button>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <span className="text-sm text-[#3A3C40]">
                    {selectedImages.length} new {selectedImages.length === 1 ? 'image' : 'images'} selected
                  </span>
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#E7EAEF]">
                        <Image
                          src={preview}
                          alt={`New Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4 justify-end pt-6 border-t border-[#E7EAEF] mt-6">
                <Button type="button" variant="outline" asChild disabled={saving || uploadingImages}>
                  <Link href="/admin/projects">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-[#6139DB] hover:bg-[#6139DB]/90" disabled={saving || uploadingImages}>
                  {saving || uploadingImages ? (
                    <>
                      <ButtonLoader className="mr-2" />
                      {uploadingImages ? 'Uploading Images...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </form>
    </div>
  );
}
