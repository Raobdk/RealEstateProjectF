"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleChange = (key: "password" | "confirmPassword", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    const passwordError = validatePassword(form.password);
    let confirmPasswordError = "";
    
    if (form.password !== form.confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }
    
    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#FAFAFA]">
        <AnimatedSection variant="slideUp" className="w-full max-w-md">
          <Card className="bg-white border border-[#E7EAEF] rounded-2xl shadow-md">
            <CardHeader className="text-center space-y-4 p-6 sm:p-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#6139DB]/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#6139DB]" />
              </div>
              <CardTitle className="text-2xl font-semibold text-[#111111]">
                Password reset successful!
              </CardTitle>
              <CardDescription className="text-[#3A3C40]">
                Your password has been successfully reset. You can now sign in with your new password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/auth/login">
                <Button variant="gradient" className="w-full">
                  Continue to login
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#FAFAFA]">
      <AnimatedSection variant="slideUp" className="w-full max-w-md">
        <Card className="bg-white border border-[#E7EAEF] rounded-2xl shadow-md">
          <CardHeader className="text-center space-y-2 p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-[#111111]">
              Reset your password
            </CardTitle>
            <CardDescription className="text-[#3A3C40]">
              Create a new strong password for your <GradientText>Landora</GradientText> account.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3C40]/60" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={cn(
                      "pl-10 pr-10",
                      errors.password && "border-destructive focus:border-destructive"
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3A3C40]/60 hover:text-[#111111] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
                <p className="text-xs text-[#3A3C40]">
                  Must be at least 8 characters with uppercase, lowercase, and numbers.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3C40]/60" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className={cn(
                      "pl-10 pr-10",
                      errors.confirmPassword && "border-destructive focus:border-destructive"
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3A3C40]/60 hover:text-[#111111] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={isLoading || !form.password || !form.confirmPassword}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Resetting password...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Reset password
                  </>
                )}
              </Button>
              <div className="text-center">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-[#3A3C40] hover:text-[#111111]"
                    type="button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

