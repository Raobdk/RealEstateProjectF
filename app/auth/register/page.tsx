"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useAuth } from "@/contexts/AuthContext";
import { validateRegisterForm, getFieldError, ValidationError } from "@/lib/validations";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user", // default to regular user
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
    setSuccess("");
    // Clear validation error for this field
    setValidationErrors((prev) => prev.filter((err) => err.field !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setValidationErrors([]);

    // Validate form
    const validation = validateRegisterForm(form);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setError("Please fix the errors below before submitting.");
      return;
    }

    setLoading(true);

    try {
      await register(form);
      
      if (form.role === "agent") {
        setSuccess("Agent registration successful! Your account is pending admin approval. You'll be notified via email once approved.");
        setTimeout(() => router.push("/auth/login"), 3000);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#FAFAFA]">
      <AnimatedSection variant="slideUp" className="w-full max-w-4xl">
        <Card className="bg-white border border-[#E7EAEF] rounded-2xl shadow-md">
          <CardHeader className="text-center space-y-2 p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-[#111111]">
              Create your Landora account
            </CardTitle>
            <CardDescription className="text-[#3A3C40]">
              Gain access to dashboards, lead pipelines, and plot inventory.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:gap-6 md:grid-cols-2 p-6 sm:p-8 pt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={getFieldError(validationErrors, "name") ? "border-red-500" : ""}
                />
                {getFieldError(validationErrors, "name") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "name")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={getFieldError(validationErrors, "email") ? "border-red-500" : ""}
                />
                {getFieldError(validationErrors, "email") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "email")}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+92 300 0000000"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={getFieldError(validationErrors, "phone") ? "border-red-500" : ""}
                />
                {getFieldError(validationErrors, "phone") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "phone")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={getFieldError(validationErrors, "password") ? "border-red-500" : ""}
                />
                {getFieldError(validationErrors, "password") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "password")}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">I want to register as</Label>
                <select
                  id="role"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6139DB]"
                >
                  <option value="user">Buyer </option>
                  <option value="agent">Agent </option>
                </select>
                {form.role === "agent" && (
                  <p className="text-xs text-[#3A3C40] bg-blue-50 p-2 rounded">
                    📋 Agent accounts require admin approval before you can access the dashboard.
                  </p>
                )}
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
                <input 
                  type="checkbox" 
                  checked={form.termsAccepted}
                  onChange={(e) => handleChange("termsAccepted", e.target.checked)}
                  className={`rounded border-[#E7EAEF] text-[#6139DB] ${
                    getFieldError(validationErrors, "terms") ? "border-red-500" : ""
                  }`}
                />
                I agree to the{" "}
                <Link href="#" className="text-[#6139DB] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#6139DB] hover:underline">
                  Privacy Policy
                </Link>
              </div>
              {getFieldError(validationErrors, "terms") && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError(validationErrors, "terms")}
                </p>
              )}
            </div>
            {error && (
              <div className="md:col-span-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="md:col-span-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                {success}
              </div>
            )}
            <div className="md:col-span-2 flex flex-col gap-4">
              <Button
                variant="default"
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating account..." : form.role === "agent" ? "Register as Agent" : "Create Account"}
              </Button>
              <p className="text-center text-sm text-[#3A3C40]">
                Already onboarded?{" "}
                <Link href="/auth/login" className="text-[#6139DB] font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

