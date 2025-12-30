"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Ruler, ArrowRight } from "lucide-react";
import { calculatorAPI } from "@/lib/api";
import { Container } from "@/components/layout/container";

const areaUnits = [
  { value: "sqft", label: "Square Feet (sqft)" },
  { value: "sqm", label: "Square Meters (sqm)" },
  { value: "sqyd", label: "Square Yards (sqyd)" },
  { value: "marla", label: "Marla" },
  { value: "kanal", label: "Kanal" },
  { value: "acre", label: "Acre" },
  { value: "hectare", label: "Hectare" },
];

export default function AreaConverterPage() {
  const [formData, setFormData] = useState({
    value: "",
    fromUnit: "sqft",
    toUnit: "marla",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user makes changes
  };

  const handleConvert = async () => {
    // Validation
    if (!formData.value || parseFloat(formData.value) <= 0) {
      setError("Please enter a valid value greater than 0");
      return;
    }

    if (formData.fromUnit === formData.toUnit) {
      setResult({
        conversion: {
          from: { value: parseFloat(formData.value), unit: formData.fromUnit },
          to: { value: parseFloat(formData.value), unit: formData.toUnit },
          allConversions: { [formData.fromUnit]: parseFloat(formData.value) },
        },
      });
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await calculatorAPI.convertAreaUnit({
        value: parseFloat(formData.value),
        fromUnit: formData.fromUnit,
        toUnit: formData.toUnit,
      });

      setResult(response.data.data);
    } catch (error: any) {
      console.error("Conversion error:", error);
      setError(error.response?.data?.message || "Failed to convert area. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <Container>
        <AnimatedSection variant="slideUp" className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
              <Ruler className="w-8 h-8 text-cyan-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-2">
              Area Unit Converter
            </h1>
            <p className="text-[#3A3C40] text-sm sm:text-base">
              Convert between different area units instantly
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection variant="slideUp">
            <Card className="bg-white border-[#E7EAEF]">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#111111]">
                  Convert Area
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Enter value"
                      value={formData.value}
                      onChange={(e) => handleChange("value", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromUnit">From</Label>
                    <select
                      id="fromUnit"
                      className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                      value={formData.fromUnit}
                      onChange={(e) => handleChange("fromUnit", e.target.value)}
                    >
                      {areaUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toUnit">To</Label>
                    <select
                      id="toUnit"
                      className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                      value={formData.toUnit}
                      onChange={(e) => handleChange("toUnit", e.target.value)}
                    >
                      {areaUnits.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                          {unit.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleConvert}
                  disabled={loading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  {loading ? "Converting..." : "Convert"}
                </Button>

                {result && (
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-xl text-white text-center">
                      <p className="text-sm opacity-90 mb-2">Converted Value</p>
                      <p className="text-4xl font-bold">
                        {result.conversion.to.value.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}{" "}
                        {result.conversion.to.unit}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#111111] mb-3">
                        All Unit Conversions
                      </h3>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(result.conversion.allConversions).map(
                          ([unit, value]: [string, any]) => (
                            <div
                              key={unit}
                              className={`p-3 rounded-lg border ${
                                unit === result.conversion.to.unit
                                  ? "bg-cyan-50 border-cyan-200"
                                  : "bg-[#FAFAFA] border-[#E7EAEF]"
                              }`}
                            >
                              <p className="text-xs text-[#3A3C40] mb-1 uppercase">{unit}</p>
                              <p className="font-semibold text-[#111111]">
                                {value.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}

