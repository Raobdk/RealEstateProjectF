"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { useAuth } from "@/contexts/AuthContext";
import { validateLoginForm, getFieldError, ValidationError } from "@/lib/validations";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
    // Clear validation error for this field
    setValidationErrors((prev) => prev.filter((err) => err.field !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setValidationErrors([]);

    // Validate form
    const validation = validateLoginForm(form);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setError("Please fix the errors below before submitting.");
      return;
    }

    setLoading(true);

    try {
      await login(form.email, form.password);
      // Redirect based on role
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "agent") {
        router.push("/agent");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#FAFAFA]">
      <AnimatedSection variant="slideUp" className="w-full max-w-3xl">
        <Card className="bg-white border border-[#E7EAEF] rounded-2xl shadow-md">
          <CardHeader className="text-center space-y-2 p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-[#111111]">
              Welcome back to <GradientText>Landora</GradientText>
            </CardTitle>
            <CardDescription className="text-[#3A3C40]">
              Sign in to Landora.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-6 sm:p-8 pt-0">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
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
            </div>
            <div className="flex items-center justify-between text-sm text-[#3A3C40]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-[#E7EAEF] text-[#6139DB]" />
                Remember me
              </label>
              <Link href="/auth/forgot-password" className="text-[#6139DB] hover:underline">
                Forgot password?
              </Link>
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            <Button
              variant="default"
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue"}
            </Button>
            <p className="text-center text-sm text-[#3A3C40]">
              New to Landora?{" "}
              <Link href="/auth/register" className="text-[#6139DB] font-semibold">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

