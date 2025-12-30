"use client";

import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, TrendingUp, Award, Target, Heart, Shield, Mail, Phone } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in honest communication and transparent dealings with all our clients.",
  },
  {
    icon: Target,
    title: "Customer First",
    description: "Your satisfaction and success in finding the perfect property is our top priority.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our business operations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering exceptional service and outstanding results.",
  },
];

const stats = [
  { label: "Properties Listed", value: "10,000+", icon: Building2 },
  { label: "Happy Clients", value: "5,000+", icon: Users },
  { label: "Years Experience", value: "15+", icon: TrendingUp },
  { label: "Awards Won", value: "25+", icon: Award },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-4 text-white max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Your Trusted <GradientText>Real Estate</GradientText> Partner
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              Zameen ka har raaz, Landora ke paas - Connecting you to your dream properties since 2010
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-[#E7EAEF]">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-[#6139DB]/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-[#6139DB]" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-[#111111] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[#3A3C40]">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#FAFAFA]">
        <Container>
          <AnimatedSection variant="slideUp" className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60 mb-4">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-6">
                Building <GradientText>Dreams</GradientText> Since 2010
              </h2>
            </div>
            <div className="space-y-6 text-[#3A3C40] text-lg leading-relaxed">
              <p>
                Landora began with a simple vision: to make real estate accessible, transparent, 
                and stress-free for everyone in Pakistan. What started as a small team in Lahore 
                has grown into one of Pakistan's most trusted real estate platforms.
              </p>
              <p>
                Today, we serve thousands of clients across major cities including Lahore, Karachi, 
                Islamabad, and Rawalpindi. Our commitment to excellence and customer satisfaction 
                has earned us recognition as a leader in the Pakistani real estate market.
              </p>
              <p>
                We don't just sell properties; we help families find homes, businesses find spaces 
                to grow, and investors discover opportunities. Every day, we work tirelessly to 
                connect people with their perfect properties.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60 mb-4">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
              What We <GradientText>Stand For</GradientText>
            </h2>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-[#E7EAEF]">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-[#6139DB]/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#6139DB]" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3A3C40]">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#FAFAFA]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection variant="slideUp">
              <Card className="h-full border-[#E7EAEF]">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-[#3A3C40] leading-relaxed">
                  <p>
                    To revolutionize the real estate experience in Pakistan by providing a 
                    transparent, efficient, and customer-centric platform that empowers people 
                    to make informed property decisions with confidence.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection variant="slideUp" delay={0.2}>
              <Card className="h-full border-[#E7EAEF]">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-[#3A3C40] leading-relaxed">
                  <p>
                    To become Pakistan's leading digital real estate ecosystem, where every 
                    property transaction is seamless, secure, and satisfying. We envision a 
                    future where finding your perfect property is just a click away.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Developer Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60 mb-4">
                Developer
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4">
                Built by <GradientText>Rao Zohaib</GradientText>
              </h2>
            </div>
            <Card className="border-[#E7EAEF]">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-[#3A3C40] text-center leading-relaxed">
                    Full-stack developer passionate about creating innovative real estate solutions 
                    that make property management accessible and efficient for everyone.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <a
                      href="mailto:raozohaibofficial06@gmail.com"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6139DB] text-white rounded-lg hover:bg-[#6139DB]/90 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email Me
                    </a>
                    <a
                      href="tel:+923037550673"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#E7EAEF] text-[#111111] rounded-lg hover:border-[#6139DB] hover:text-[#6139DB] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call: +92 303 7550673
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-white/90">
              Join thousands of satisfied clients who found their perfect property with Landora
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
