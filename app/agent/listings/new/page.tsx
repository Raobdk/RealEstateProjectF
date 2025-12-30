"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Upload, Save, X } from "lucide-react";
import Link from "next/link";

export default function NewListingPage() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    area: "",
    description: "",
    features: "",
    propertyType: "plot",
    status: "pending",
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Add New Listing</h1>
            <p className="text-[#3A3C40] mt-1">Create a new property listing</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/agent/listings">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <AnimatedSection variant="slideUp" className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Premium 1 Kanal Plot - DHA Phase 5"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., DHA Phase 5, Lahore"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <select
                    id="propertyType"
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full h-11 px-4 border border-[#E7EAEF] rounded-xl bg-white"
                  >
                    <option value="plot">Plot</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    placeholder="PKR 32M"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area *</Label>
                  <Input
                    id="area"
                    placeholder="e.g., 1 Kanal, 10 Marla"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe the property..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E7EAEF] rounded-xl bg-white resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Key Features</Label>
                <Input
                  id="features"
                  placeholder="e.g., Corner, West Open, Park Facing"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">Photos & Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative aspect-video bg-[#E7EAEF] rounded-xl">
                    <button className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="aspect-video border-2 border-dashed border-[#E7EAEF] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#6139DB] transition-colors">
                  <Upload className="h-8 w-8 text-[#3A3C40] mb-2" />
                  <p className="text-sm text-[#3A3C40]">Upload</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Sidebar */}
        <AnimatedSection variant="slideUp">
          <Card className="bg-white border-[#E7EAEF] sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">Listing Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full h-11 px-4 border border-[#E7EAEF] rounded-xl bg-white"
                >
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <Button className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90">
                <Save className="h-4 w-4 mr-2" />
                Save Listing
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/agent/listings">Cancel</Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}

