"use client";

import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Shield, Eye, CheckCircle, XCircle } from "lucide-react";

const cookieTypes = [
  {
    icon: Shield,
    title: "Essential Cookies",
    description: "Required for the platform to function properly. These cannot be disabled.",
    required: true,
    examples: [
      "Authentication and login sessions",
      "Security and fraud prevention",
      "Load balancing and performance",
      "User preferences and settings"
    ]
  },
  {
    icon: Eye,
    title: "Analytics Cookies",
    description: "Help us understand how visitors interact with our platform.",
    required: false,
    examples: [
      "Page views and user journeys",
      "Time spent on pages",
      "Click patterns and interactions",
      "Device and browser information"
    ]
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    description: "Enable enhanced functionality and personalization.",
    required: false,
    examples: [
      "Saved searches and filters",
      "Language and region preferences",
      "Property comparison lists",
      "Favorite properties and bookmarks"
    ]
  },
  {
    icon: Cookie,
    title: "Marketing Cookies",
    description: "Used to deliver relevant advertisements and track campaigns.",
    required: false,
    examples: [
      "Ad targeting and retargeting",
      "Campaign effectiveness measurement",
      "Social media integration",
      "Affiliate tracking"
    ]
  }
];

const thirdPartyCookies = [
  {
    provider: "Google Analytics",
    purpose: "Website traffic analysis and user behavior tracking",
    cookieDuration: "Up to 2 years"
  },
  {
    provider: "Facebook Pixel",
    purpose: "Ad targeting and conversion tracking",
    cookieDuration: "Up to 90 days"
  },
  {
    provider: "Cloudflare",
    purpose: "Security, performance, and DDoS protection",
    cookieDuration: "Session"
  }
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Cookie <GradientText>Policy</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              Learn how we use cookies and similar technologies to enhance your experience
            </p>
            <p className="text-sm text-white/60">
              Last Updated: December 22, 2025
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="max-w-4xl mx-auto">
            <Card className="border-[#E7EAEF]">
              <CardContent className="p-8 space-y-4">
                <h2 className="text-2xl font-bold text-[#111111] mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-[#3A3C40] leading-relaxed">
                  Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our platform, and enabling certain features.
                </p>
                <p className="text-[#3A3C40] leading-relaxed">
                  This Cookie Policy explains what cookies are, how we use them, the types of cookies we use, and how you can control them. By using our platform, you consent to our use of cookies in accordance with this policy.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
                  <p className="text-sm text-[#3A3C40]">
                    <strong className="text-[#111111]">Quick Note:</strong> You can change your cookie preferences at any time through your browser settings. However, disabling certain cookies may impact your experience on our platform.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Container>
      </section>

      {/* Cookie Types */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-4">
              Types of <GradientText>Cookies</GradientText> We Use
            </h2>
            <p className="text-lg text-[#3A3C40] max-w-3xl mx-auto">
              We use different types of cookies for various purposes to improve your experience
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-6">
            {cookieTypes.map((type, index) => (
              <AnimatedSection key={index} variant="slideUp" delay={index * 0.1}>
                <Card className="border-[#E7EAEF]">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#6139DB]/10 flex items-center justify-center flex-shrink-0">
                          <type.icon className="w-6 h-6 text-[#6139DB]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#111111] mb-2">
                            {type.title}
                          </h3>
                          <p className="text-[#3A3C40]">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      {type.required ? (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full whitespace-nowrap">
                          <CheckCircle className="w-4 h-4" />
                          <span>Required</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-[#3A3C40] bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                          <XCircle className="w-4 h-4" />
                          <span>Optional</span>
                        </div>
                      )}
                    </div>
                    <div className="pl-16">
                      <p className="text-sm font-semibold text-[#111111] mb-2">Examples:</p>
                      <ul className="space-y-1">
                        {type.examples.map((example, exIndex) => (
                          <li key={exIndex} className="text-sm text-[#3A3C40] flex items-start gap-2">
                            <span className="text-[#6139DB] mt-1">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection variant="slideUp">
              <h2 className="text-3xl font-bold text-[#111111] mb-8 text-center">
                Third-Party <GradientText>Cookies</GradientText>
              </h2>
              <Card className="border-[#E7EAEF]">
                <CardContent className="p-8">
                  <p className="text-[#3A3C40] leading-relaxed mb-6">
                    We work with trusted third-party service providers who may set cookies on your device. These cookies help us provide better services, analyze traffic, and display relevant advertisements.
                  </p>
                  <div className="space-y-6">
                    {thirdPartyCookies.map((provider, index) => (
                      <div key={index} className={index > 0 ? "pt-6 border-t border-[#E7EAEF]" : ""}>
                        <h3 className="font-semibold text-[#111111] mb-2">{provider.provider}</h3>
                        <div className="space-y-1 text-sm text-[#3A3C40]">
                          <p><strong>Purpose:</strong> {provider.purpose}</p>
                          <p><strong>Cookie Duration:</strong> {provider.cookieDuration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Managing Cookies */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection variant="slideUp">
              <h2 className="text-3xl font-bold text-[#111111] mb-8 text-center">
                Managing Your <GradientText>Cookie Preferences</GradientText>
              </h2>
              <Card className="border-[#E7EAEF]">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#111111] mb-3">Browser Settings</h3>
                    <p className="text-[#3A3C40] leading-relaxed mb-4">
                      Most web browsers allow you to control cookies through their settings. You can set your browser to:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-[#3A3C40] flex items-start gap-2">
                        <span className="text-[#6139DB] mt-1">•</span>
                        <span>Block all cookies</span>
                      </li>
                      <li className="text-[#3A3C40] flex items-start gap-2">
                        <span className="text-[#6139DB] mt-1">•</span>
                        <span>Accept only first-party cookies</span>
                      </li>
                      <li className="text-[#3A3C40] flex items-start gap-2">
                        <span className="text-[#6139DB] mt-1">•</span>
                        <span>Delete cookies when you close your browser</span>
                      </li>
                      <li className="text-[#3A3C40] flex items-start gap-2">
                        <span className="text-[#6139DB] mt-1">•</span>
                        <span>Receive a notification before a cookie is set</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[#E7EAEF]">
                    <h3 className="font-semibold text-[#111111] mb-3">Browser-Specific Instructions</h3>
                    <div className="space-y-2 text-sm text-[#3A3C40]">
                      <p><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</p>
                      <p><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                      <p><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                      <p><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and data stored</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E7EAEF]">
                    <h3 className="font-semibold text-[#111111] mb-3">Impact of Disabling Cookies</h3>
                    <p className="text-[#3A3C40] leading-relaxed">
                      Please note that disabling cookies may affect your ability to use certain features of our platform. Essential cookies are necessary for basic functionality and cannot be disabled if you want to use our Services.
                    </p>
                  </div>

                  <div className="bg-[#6139DB]/5 border-l-4 border-[#6139DB] p-4 rounded mt-6">
                    <p className="text-sm text-[#3A3C40]">
                      <strong className="text-[#111111]">Need Help?</strong> If you have questions about managing your cookie preferences, please contact us at{" "}
                      <a href="mailto:raozohaibofficial06@gmail.com" className="text-[#6139DB] hover:underline">
                        raozohaibofficial06@gmail.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Updates Section */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection variant="slideUp">
              <Card className="border-[#E7EAEF]">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#111111] mb-4">
                    Updates to This Policy
                  </h2>
                  <p className="text-[#3A3C40] leading-relaxed">
                    We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. When we make significant changes, we will notify you through our platform or via email.
                  </p>
                  <p className="text-[#3A3C40] leading-relaxed mt-4">
                    We encourage you to review this policy periodically to stay informed about how we use cookies. The "Last Updated" date at the top of this page indicates when this policy was last revised.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Questions About Cookies?
            </h2>
            <p className="text-lg text-white/90">
              We're here to help you understand and manage your cookie preferences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="secondary" size="lg">
                Manage Preferences
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <a href="mailto:raozohaibofficial06@gmail.com">Contact Us</a>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
