"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Calculator, Building2, TrendingUp, DollarSign } from "lucide-react";
import { calculatorAPI } from "@/lib/api";
import { Container } from "@/components/layout/container";

export default function ConstructionCalculatorPage() {
  const [formData, setFormData] = useState({
    area: "",
    areaUnit: "sqft" as "sqft" | "marla",
    constructionType: "standard" as "basic" | "standard" | "premium" | "luxury",
    city: "",
    floors: "1",
    basement: false,
    roofType: "flat" as "flat" | "sloped" | "terrace",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user makes changes
  };

  const handleCalculate = async () => {
    // Validation
    if (!formData.area || parseFloat(formData.area) <= 0) {
      setError("Please enter a valid area greater than 0");
      return;
    }
    if (parseInt(formData.floors) <= 0) {
      setError("Number of floors must be at least 1");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await calculatorAPI.calculateConstructionCost({
        area: parseFloat(formData.area),
        areaUnit: formData.areaUnit,
        constructionType: formData.constructionType,
        city: formData.city,
        floors: parseInt(formData.floors) || 1,
        basement: formData.basement,
        roofType: formData.roofType,
      });

      setResult(response.data.data.calculation);
    } catch (error: any) {
      console.error("Calculation error:", error);
      setError(error.response?.data?.message || "Failed to calculate construction cost. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <Container>
        <AnimatedSection variant="slideUp" className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6139DB]/10 rounded-full mb-4">
              <Calculator className="w-8 h-8 text-[#6139DB]" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-2">
              Construction Cost Calculator
            </h1>
            <p className="text-[#3A3C40] text-sm sm:text-base">
              Estimate your construction costs accurately
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form */}
          <AnimatedSection variant="slideUp">
            <Card className="bg-white border-[#E7EAEF]">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#111111]">
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Enter area"
                      value={formData.area}
                      onChange={(e) => handleChange("area", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="areaUnit">Unit</Label>
                    <select
                      id="areaUnit"
                      className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                      value={formData.areaUnit}
                      onChange={(e) =>
                        handleChange("areaUnit", e.target.value as "sqft" | "marla")
                      }
                    >
                      <option value="sqft">Square Feet</option>
                      <option value="marla">Marla</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constructionType">Construction Type</Label>
                  <select
                    id="constructionType"
                    className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                    value={formData.constructionType}
                    onChange={(e) =>
                      handleChange(
                        "constructionType",
                        e.target.value as "basic" | "standard" | "premium" | "luxury"
                      )
                    }
                  >
                    <option value="basic">Basic (PKR 2,000/sqft)</option>
                    <option value="standard">Standard (PKR 2,800/sqft)</option>
                    <option value="premium">Premium (PKR 3,800/sqft)</option>
                    <option value="luxury">Luxury (PKR 5,500/sqft)</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City (Optional)</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Lahore"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input
                      id="floors"
                      type="number"
                      min="1"
                      value={formData.floors}
                      onChange={(e) => handleChange("floors", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roofType">Roof Type</Label>
                  <select
                    id="roofType"
                    className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                    value={formData.roofType}
                    onChange={(e) =>
                      handleChange("roofType", e.target.value as "flat" | "sloped" | "terrace")
                    }
                  >
                    <option value="flat">Flat</option>
                    <option value="sloped">Sloped</option>
                    <option value="terrace">Terrace</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="basement"
                    checked={formData.basement}
                    onChange={(e) => handleChange("basement", e.target.checked)}
                    className="w-4 h-4 text-[#6139DB] border-[#E7EAEF] rounded"
                  />
                  <Label htmlFor="basement" className="cursor-pointer">
                    Include Basement
                  </Label>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90"
                >
                  {loading ? "Calculating..." : "Calculate Cost"}
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection variant="slideUp">
            {result ? (
              <Card className="bg-white border-[#E7EAEF]">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#111111]">
                    Estimated Cost
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80 rounded-xl text-white">
                    <p className="text-sm opacity-90 mb-2">Total Construction Cost</p>
                    <p className="text-4xl font-bold">
                      PKR {result.costBreakdown.totalCost.toLocaleString()}
                    </p>
                    <p className="text-sm opacity-75 mt-2">
                      PKR {result.costBreakdown.perSqft.toLocaleString()} per sqft
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#111111]">Cost Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Structure</span>
                        <span className="font-semibold">
                          PKR {result.costBreakdown.breakdown.structure.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Finishing</span>
                        <span className="font-semibold">
                          PKR {result.costBreakdown.breakdown.finishing.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Electrical</span>
                        <span className="font-semibold">
                          PKR {result.costBreakdown.breakdown.electrical.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Plumbing</span>
                        <span className="font-semibold">
                          PKR {result.costBreakdown.breakdown.plumbing.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Miscellaneous</span>
                        <span className="font-semibold">
                          PKR {result.costBreakdown.breakdown.miscellaneous.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#E7EAEF]">
                        <span className="text-[#3A3C40]">Contingency (8%)</span>
                        <span className="font-semibold">
                          PKR {result.costBreakdown.contingency.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-[#3A3C40]">
                      <strong>Estimated Duration:</strong> {result.estimatedDuration} months
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-[#E7EAEF]">
                <CardContent className="p-12 text-center">
                  <Building2 className="w-16 h-16 text-[#E7EAEF] mx-auto mb-4" />
                  <p className="text-[#3A3C40]">Enter project details and click calculate</p>
                </CardContent>
              </Card>
            )}
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}

