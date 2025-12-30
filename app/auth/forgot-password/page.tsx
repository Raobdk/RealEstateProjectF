"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                Check your email
              </CardTitle>
              <CardDescription className="text-base text-[#3A3C40]">
                We&apos;ve sent a password reset link to
              </CardDescription>
              <p className="text-[#6139DB] font-medium break-all">{email}</p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-6 sm:p-8 pt-0">
              <div className="space-y-4 text-sm text-[#3A3C40]">
                <p className="text-center">
                  Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
                </p>
                <div className="flex items-center gap-2 p-4 rounded-lg bg-[#6139DB]/10 border border-[#6139DB]/20">
                  <Mail className="w-5 h-5 text-[#6139DB] flex-shrink-0" />
                  <p className="text-xs">
                    The reset link will expire in <strong>15 minutes</strong> for security reasons.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another email
                </Button>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                  </Button>
                </Link>
              </div>
              <p className="text-center text-sm text-[#3A3C40]">
                Didn&apos;t receive the email?{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#6139DB] font-semibold hover:underline"
                >
                  Try again
                </button>
              </p>
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
              Forgot your password?
            </CardTitle>
            <CardDescription className="text-[#3A3C40]">
              No worries! Enter your email address and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3C40]/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-[#3A3C40]">
                  Enter the email address associated with your <GradientText>Landora</GradientText> account.
                </p>
              </div>
              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send reset link
                  </>
                )}
              </Button>
              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full" type="button">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                  </Button>
                </Link>
                <p className="text-center text-sm text-[#3A3C40]">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

