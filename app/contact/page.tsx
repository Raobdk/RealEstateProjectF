"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call - Replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+92 303 7550673"],
      subtitle: "Mon-Sat 9AM-6PM",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["raozohaibofficial06@gmail.com"],
      subtitle: "24/7 Support",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["DHA Phase 5", "Lahore, Pakistan"],
      subtitle: "Visit us anytime",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM"],
      subtitle: "Closed on Sundays",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-4 text-white max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">
              Get In Touch
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Contact <GradientText>Landora</GradientText>
            </h1>
            <p className="text-lg text-white/80">
              Have questions? We&apos;re here to help you find your perfect property
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16">
        <Container>
          <AnimatedSection variant="slideUp" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-[#E7EAEF] bg-white">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-full bg-[#6139DB]/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-[#6139DB]" />
                  </div>
                  <h3 className="font-semibold text-[#111111] mb-2 text-lg">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-[#3A3C40] text-sm">
                      {detail}
                    </p>
                  ))}
                  <p className="text-[#3A3C40]/60 text-xs mt-2">{info.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <AnimatedSection variant="slideUp">
              <Card className="border-[#E7EAEF] bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-[#3A3C40]">
                    Fill out the form below and we&apos;ll get back to you as soon as possible
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+92 300 0000000"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6139DB] resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                        Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90"
                    >
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Map & Additional Info */}
            <AnimatedSection variant="slideUp" delay={0.2}>
              <Card className="border-[#E7EAEF] bg-white h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Visit Our Office</CardTitle>
                  <p className="text-[#3A3C40]">
                    Come visit us at our office for a face-to-face consultation
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Map Placeholder */}
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-[#6139DB]" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#111111] mb-2">Head Office</h4>
                      <p className="text-[#3A3C40] text-sm">
                        DHA Phase 5, Commercial Area<br />
                        Lahore, Punjab 54000<br />
                        Pakistan
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#111111] mb-2">Quick Contact</h4>
                      <p className="text-[#3A3C40] text-sm">
                        General Inquiries: info@landora.com<br />
                        Support: support@landora.com<br />
                        Phone: +92 300 1234567
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E7EAEF]">
                      <Button className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4">
              Frequently Asked <GradientText>Questions</GradientText>
            </h2>
            <p className="text-[#3A3C40] max-w-2xl mx-auto">
              Find quick answers to common questions about our services
            </p>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How do I list my property on Landora?",
                a: "You can list your property by creating an account and clicking on 'Add Property' button. Our team will verify and publish your listing within 24 hours.",
              },
              {
                q: "Are the property prices negotiable?",
                a: "Price negotiations depend on the seller. You can contact the agent or seller directly through our platform to discuss pricing.",
              },
              {
                q: "Do you charge any commission?",
                a: "We charge a standard commission fee from sellers upon successful transactions. Buyers can browse and contact sellers free of charge.",
              },
              {
                q: "How can I verify property ownership?",
                a: "We recommend conducting proper due diligence including title verification, physical inspection, and legal consultation before finalizing any purchase.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-[#E7EAEF]">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3A3C40]">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
