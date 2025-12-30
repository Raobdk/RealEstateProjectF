"use client";

import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, Users, Building2, AlertTriangle, Shield, Ban, CheckCircle } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: `By accessing and using Landora's platform and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our Services.

These terms constitute a legally binding agreement between you and Landora. Your use of our Services is subject to your compliance with these terms at all times.`
  },
  {
    icon: Users,
    title: "2. User Accounts & Registration",
    content: `To access certain features of our platform, you must register for an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and promptly update your account information
• Keep your password secure and confidential
• Notify us immediately of any unauthorized access to your account
• Be responsible for all activities that occur under your account
• Not share your account credentials with others
• Be at least 18 years old to create an account

We reserve the right to suspend or terminate accounts that violate these terms or are inactive for extended periods.`
  },
  {
    icon: Building2,
    title: "3. Property Listings & Information",
    content: `When listing properties on Landora, you represent and warrant that:

• You have the legal right and authority to list the property
• All property information provided is accurate, current, and complete
• Property images are authentic and representative of the actual property
• You hold valid ownership documents or authorization from the property owner
• The property complies with all applicable local laws and regulations
• You will not post misleading, fraudulent, or deceptive information

We reserve the right to remove any listing that violates these terms or appears suspicious. False or misleading listings may result in account suspension or termination.`
  },
  {
    icon: Scale,
    title: "4. User Conduct & Prohibited Activities",
    content: `You agree NOT to:

• Use our Services for any illegal or unauthorized purpose
• Violate any applicable laws, regulations, or third-party rights
• Post false, misleading, or fraudulent content
• Engage in harassment, abuse, or threatening behavior
• Attempt to gain unauthorized access to our systems or other users' accounts
• Distribute viruses, malware, or other harmful code
• Scrape, copy, or aggregate data from our platform without permission
• Impersonate another person or entity
• Engage in spamming or unsolicited marketing
• Interfere with or disrupt the operation of our Services
• Use automated systems or bots without authorization

Violation of these prohibitions may result in immediate account termination and legal action.`
  },
  {
    icon: Shield,
    title: "5. Intellectual Property Rights",
    content: `All content, features, and functionality of Landora's platform, including but not limited to text, graphics, logos, images, software, and design, are owned by Landora or its licensors and are protected by copyright, trademark, and other intellectual property laws.

You are granted a limited, non-exclusive, non-transferable license to access and use our Services for their intended purpose. You may not:

• Copy, modify, distribute, or create derivative works from our content
• Reverse engineer, decompile, or disassemble our software
• Remove or alter any copyright, trademark, or proprietary notices
• Use our trademarks or branding without written permission

User-generated content (property listings, images, descriptions) remains your property, but you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute such content for operating and promoting our Services.`
  },
  {
    icon: AlertTriangle,
    title: "6. Disclaimer of Warranties",
    content: `Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:

• Our Services will be uninterrupted, secure, or error-free
• Information provided on our platform is always accurate or complete
• Defects will be corrected
• Our servers are free from viruses or other harmful components

While we verify property listings, we do not guarantee the accuracy, completeness, or legality of any property information. Users are responsible for conducting their own due diligence before entering into any real estate transaction.

We are not responsible for the conduct of users or third parties on our platform. You assume all risks associated with your interactions with other users.`
  },
  {
    icon: Ban,
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by law, Landora and its officers, directors, employees, and agents shall not be liable for:

• Any indirect, incidental, special, consequential, or punitive damages
• Loss of profits, revenue, data, or business opportunities
• Damages resulting from user errors or unauthorized access
• Property disputes, fraud, or misrepresentation by users
• Any damages exceeding the amount you paid us in the past 12 months

Some jurisdictions do not allow limitation of liability for certain types of damages, so some of these limitations may not apply to you.`
  },
  {
    icon: CheckCircle,
    title: "8. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Landora, its affiliates, officers, directors, employees, agents, and licensors from any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising from:

• Your use or misuse of our Services
• Your violation of these Terms of Service
• Your violation of any third-party rights, including intellectual property rights
• Your property listings or any content you submit
• Your interactions with other users
• Any fraudulent or illegal activities conducted through your account

This indemnification obligation survives termination of these terms and your use of our Services.`
  }
];

const additionalTerms = [
  {
    title: "Payments & Fees",
    content: "Certain features and services may require payment. All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time with reasonable notice. You are responsible for all taxes associated with your use of paid services."
  },
  {
    title: "Third-Party Services",
    content: "Our platform may integrate with or link to third-party services, websites, or applications. We are not responsible for the content, privacy practices, or availability of third-party services. Your use of such services is at your own risk and subject to their terms and policies."
  },
  {
    title: "Dispute Resolution",
    content: "Any disputes arising from these terms or your use of our Services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with Pakistani law, with proceedings held in Lahore, Pakistan."
  },
  {
    title: "Termination",
    content: "We reserve the right to suspend or terminate your account at any time, with or without notice, for violating these terms or for any other reason. Upon termination, your right to use our Services immediately ceases. Provisions that by their nature should survive termination shall remain in effect."
  },
  {
    title: "Modifications to Terms",
    content: "We may modify these Terms of Service at any time. Significant changes will be notified via email or platform notice. Continued use of our Services after changes take effect constitutes acceptance of the modified terms. We encourage you to review these terms periodically."
  },
  {
    title: "Governing Law",
    content: "These Terms of Service shall be governed by and construed in accordance with the laws of Pakistan, without regard to conflict of law principles. The courts of Lahore, Pakistan shall have exclusive jurisdiction over any disputes."
  },
  {
    title: "Severability",
    content: "If any provision of these terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. Invalid provisions shall be modified to reflect the parties' intention to the extent possible."
  },
  {
    title: "Entire Agreement",
    content: "These Terms of Service, together with our Privacy Policy and any other legal notices published on our platform, constitute the entire agreement between you and Landora regarding our Services and supersede any prior agreements."
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Terms of <GradientText>Service</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              Please read these terms carefully before using our platform and services
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
                  Welcome to Landora
                </h2>
                <p className="text-[#3A3C40] leading-relaxed">
                  These Terms of Service ("Terms") govern your access to and use of Landora's real estate platform, website, mobile applications, and related services (collectively, the "Services"). These Terms apply to all users, including property owners, agents, buyers, renters, and visitors.
                </p>
                <p className="text-[#3A3C40] leading-relaxed">
                  By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these terms, you may not access or use our Services.
                </p>
                <div className="bg-[#6139DB]/5 border-l-4 border-[#6139DB] p-4 rounded mt-6">
                  <p className="text-sm text-[#3A3C40]">
                    <strong className="text-[#111111]">Important Notice:</strong> These terms include important information about your legal rights, remedies, and obligations. Please read them carefully. By using our Services, you agree to resolve disputes through binding arbitration and waive your right to participate in class actions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Container>
      </section>

      {/* Main Terms Sections */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <AnimatedSection key={index} variant="slideUp" delay={index * 0.05}>
                <Card className="border-[#E7EAEF]">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#6139DB]/10 flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-[#6139DB]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111111] mt-1">
                        {section.title}
                      </h2>
                    </div>
                    <div className="pl-16">
                      <p className="text-[#3A3C40] leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Terms */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection variant="slideUp">
              <h2 className="text-3xl font-bold text-[#111111] mb-8 text-center">
                Additional <GradientText>Terms</GradientText>
              </h2>
              <Card className="border-[#E7EAEF]">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {additionalTerms.map((term, index) => (
                      <div key={index} className={index > 0 ? "pt-8 border-t border-[#E7EAEF]" : ""}>
                        <h3 className="text-xl font-semibold text-[#111111] mb-3">
                          {term.title}
                        </h3>
                        <p className="text-[#3A3C40] leading-relaxed">
                          {term.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection variant="slideUp">
              <Card className="border-[#E7EAEF]">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#111111] mb-4">
                    Contact Information
                  </h2>
                  <p className="text-[#3A3C40] leading-relaxed mb-6">
                    If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-3 text-[#3A3C40]">
                    <p>
                      <strong className="text-[#111111]">Company:</strong> Landora - Real Estate Management System
                    </p>
                    <p>
                      <strong className="text-[#111111]">Developer:</strong> Rao Zohaib
                    </p>
                    <p>
                      <strong className="text-[#111111]">Email:</strong>{" "}
                      <a href="mailto:raozohaibofficial06@gmail.com" className="text-[#6139DB] hover:underline">
                        raozohaibofficial06@gmail.com
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#111111]">Phone:</strong>{" "}
                      <a href="tel:+923037550673" className="text-[#6139DB] hover:underline">
                        +92 303 7550673
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#111111]">Location:</strong> Lahore, Pakistan
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Acknowledgment Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Questions About These Terms?
            </h2>
            <p className="text-lg text-white/90">
              We're here to help clarify any questions you may have about our Terms of Service
            </p>
            <div className="bg-white/10 rounded-lg p-6 text-left">
              <p className="text-sm text-white/80 mb-4">
                By clicking "I Accept" or by accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <p className="text-xs text-white/60">
                These terms were last updated on December 22, 2025, and are effective immediately for new users and 30 days after posting for existing users.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
