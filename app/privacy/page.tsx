"use client";

import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, UserCheck, FileText, Bell, Globe } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect information you provide directly, including name, email address, phone number, CNIC, address, and payment information when you register, list properties, or make inquiries."
      },
      {
        subtitle: "Usage Information",
        text: "We automatically collect information about your device, browsing actions, and usage patterns when you access our platform, including IP address, browser type, and pages visited."
      },
      {
        subtitle: "Property Information",
        text: "For property listings, we collect details about properties including location, size, price, images, and related documents."
      }
    ]
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "We use your information to provide, maintain, and improve our real estate services, process transactions, and communicate with you about your account and properties."
      },
      {
        subtitle: "Personalization",
        text: "We use data to personalize your experience, show relevant property recommendations, and provide customized content based on your preferences."
      },
      {
        subtitle: "Security & Fraud Prevention",
        text: "Your information helps us verify identities, detect and prevent fraud, and maintain the security and integrity of our platform."
      },
      {
        subtitle: "Marketing Communications",
        text: "With your consent, we may send promotional emails about new properties, features, and offers. You can unsubscribe anytime."
      }
    ]
  },
  {
    icon: Lock,
    title: "How We Protect Your Information",
    content: [
      {
        subtitle: "Encryption",
        text: "All sensitive data is encrypted using industry-standard SSL/TLS protocols during transmission and at rest using AES-256 encryption."
      },
      {
        subtitle: "Access Controls",
        text: "We implement strict access controls and authentication mechanisms. Only authorized personnel can access sensitive information on a need-to-know basis."
      },
      {
        subtitle: "Regular Security Audits",
        text: "We conduct regular security assessments, vulnerability scans, and penetration testing to identify and address potential security risks."
      },
      {
        subtitle: "Secure Infrastructure",
        text: "Our systems are hosted on secure, monitored servers with firewalls, intrusion detection, and regular backup procedures."
      }
    ]
  },
  {
    icon: UserCheck,
    title: "Information Sharing & Disclosure",
    content: [
      {
        subtitle: "With Property Seekers",
        text: "When you list a property, certain information (property details, your name, and contact information) is visible to registered users and potential buyers."
      },
      {
        subtitle: "Service Providers",
        text: "We may share information with trusted third-party service providers who assist in operations, such as payment processors, email services, and analytics providers."
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information when required by law, court order, or government request, or to protect our rights, property, or safety."
      },
      {
        subtitle: "Business Transfers",
        text: "In case of merger, acquisition, or sale of assets, your information may be transferred. You will be notified of any such change."
      }
    ]
  },
  {
    icon: FileText,
    title: "Your Rights & Choices",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You can access, review, and update your personal information at any time through your account settings."
      },
      {
        subtitle: "Data Deletion",
        text: "You can request deletion of your account and personal data. Some information may be retained as required by law or legitimate business purposes."
      },
      {
        subtitle: "Marketing Opt-Out",
        text: "You can unsubscribe from marketing communications by clicking the unsubscribe link in emails or updating your notification preferences."
      },
      {
        subtitle: "Cookie Preferences",
        text: "You can control cookies through your browser settings. Note that disabling cookies may affect platform functionality."
      }
    ]
  },
  {
    icon: Bell,
    title: "Cookies & Tracking Technologies",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "Required for platform functionality, authentication, and security. These cannot be disabled."
      },
      {
        subtitle: "Analytics Cookies",
        text: "Help us understand how users interact with our platform, allowing us to improve user experience and performance."
      },
      {
        subtitle: "Marketing Cookies",
        text: "Used to deliver relevant advertisements and track campaign effectiveness. You can opt-out of these cookies."
      }
    ]
  },
  {
    icon: Globe,
    title: "International Data Transfers",
    content: [
      {
        subtitle: "Data Storage",
        text: "Your information is primarily stored on servers located in Pakistan. We ensure appropriate safeguards are in place for any international transfers."
      },
      {
        subtitle: "Cross-Border Transfers",
        text: "If we transfer data internationally, we implement appropriate safeguards such as standard contractual clauses and encryption."
      }
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Privacy <GradientText>Policy</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                <p className="text-[#3A3C40] leading-relaxed">
                  Welcome to Landora's Privacy Policy. This policy describes how Landora ("we," "us," or "our") collects, uses, and shares information about you when you use our real estate platform, website, and services (collectively, the "Services").
                </p>
                <p className="text-[#3A3C40] leading-relaxed">
                  By accessing or using our Services, you agree to this Privacy Policy. If you do not agree with this policy, please do not use our Services. We are committed to protecting your privacy and ensuring transparency in how we handle your data.
                </p>
                <div className="bg-[#6139DB]/5 border-l-4 border-[#6139DB] p-4 rounded">
                  <p className="text-sm text-[#3A3C40]">
                    <strong>Contact Us:</strong> If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:raozohaibofficial06@gmail.com" className="text-[#6139DB] hover:underline">
                      raozohaibofficial06@gmail.com
                    </a>
                    {" "}or call{" "}
                    <a href="tel:+923037550673" className="text-[#6139DB] hover:underline">
                      +92 303 7550673
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </Container>
      </section>

      {/* Policy Sections */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <AnimatedSection key={index} variant="slideUp" delay={index * 0.1}>
                <Card className="border-[#E7EAEF]">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#6139DB]/10 flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-[#6139DB]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#111111] mb-2">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                    <div className="space-y-6 pl-16">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h3 className="font-semibold text-[#111111] mb-2">
                            {item.subtitle}
                          </h3>
                          <p className="text-[#3A3C40] leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Information */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection variant="slideUp">
              <Card className="border-[#E7EAEF]">
                <CardContent className="p-8 space-y-6">
                  <h2 className="text-2xl font-bold text-[#111111]">
                    Changes to This Privacy Policy
                  </h2>
                  <p className="text-[#3A3C40] leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make significant changes, we will notify you by email (if you have provided your email address) or by posting a notice on our platform before the changes take effect.
                  </p>
                  <p className="text-[#3A3C40] leading-relaxed">
                    We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our Services after changes are made constitutes acceptance of those changes.
                  </p>
                  
                  <div className="pt-6 border-t border-[#E7EAEF]">
                    <h3 className="font-semibold text-[#111111] mb-3">Children's Privacy</h3>
                    <p className="text-[#3A3C40] leading-relaxed">
                      Our Services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#E7EAEF]">
                    <h3 className="font-semibold text-[#111111] mb-3">Third-Party Links</h3>
                    <p className="text-[#3A3C40] leading-relaxed">
                      Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information to them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Questions About Privacy?
            </h2>
            <p className="text-lg text-white/90">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <Shield className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Lock className="w-4 h-4" />
                <span>Encrypted Data</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <UserCheck className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
