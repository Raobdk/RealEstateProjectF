"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText,
  Home,
  Building2,
  Users,
  DollarSign,
  Shield,
  Settings,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    icon: Home,
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account on Landora?",
        answer: "Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. Once verified, you can start browsing properties or list your own."
      },
      {
        question: "Is Landora free to use?",
        answer: "Browsing properties and basic features are completely free. For agents listing properties, we offer various packages with different features and visibility options."
      },
      {
        question: "How do I search for properties?",
        answer: "Use the search bar on our homepage to enter your desired location, property type, and budget. You can further refine your search using our advanced filters."
      }
    ]
  },
  {
    icon: Building2,
    title: "Buying & Selling",
    faqs: [
      {
        question: "How do I list my property for sale?",
        answer: "Register as an agent or property owner, complete your profile verification, then navigate to 'Add Property' from your dashboard. Fill in all required details, upload high-quality images, and submit for review."
      },
      {
        question: "What documents do I need to sell property?",
        answer: "You'll need original property documents (title deed, NOC, possession letter), CNIC copies of all owners, recent utility bills, and property tax receipts. Our agents can guide you through the complete documentation process."
      },
      {
        question: "How long does property verification take?",
        answer: "Property verification typically takes 24-48 hours. Our team reviews all details, documents, and images to ensure quality and authenticity before listing goes live."
      }
    ]
  },
  {
    icon: Users,
    title: "For Agents",
    faqs: [
      {
        question: "How do I become a verified agent?",
        answer: "Submit your agent application with valid CNIC, professional certification (if any), and references. Our team will review and approve within 3-5 business days."
      },
      {
        question: "What are the commission rates?",
        answer: "Commission rates vary by property type and value. Standard rates range from 1-3% of the property value. Contact our team for detailed commission structures."
      },
      {
        question: "Can I manage multiple listings?",
        answer: "Yes! Our agent dashboard allows you to manage unlimited listings, track leads, monitor customer interactions, and access detailed analytics."
      }
    ]
  },
  {
    icon: DollarSign,
    title: "Payments & Pricing",
    faqs: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept bank transfers, online payment gateways, and cash payments at our office. All transactions are secure and documented."
      },
      {
        question: "How are property prices determined?",
        answer: "Property prices are set by sellers based on market rates, location, size, and amenities. Our valuation tools can help you estimate fair market value."
      },
      {
        question: "Are there any hidden charges?",
        answer: "No, we believe in complete transparency. All charges, including service fees, commission rates, and additional costs are clearly mentioned upfront."
      }
    ]
  },
  {
    icon: Shield,
    title: "Safety & Security",
    faqs: [
      {
        question: "How does Landora verify properties?",
        answer: "We verify all property documents, conduct physical inspections, check legal status, and validate owner information before listing approval."
      },
      {
        question: "Is my personal information safe?",
        answer: "Absolutely. We use bank-level encryption for all data. Your personal information is never shared without your consent and is protected by our strict privacy policy."
      },
      {
        question: "What if I encounter fraud?",
        answer: "Report any suspicious activity immediately to our support team. We have a dedicated fraud prevention team and will take immediate action."
      }
    ]
  },
  {
    icon: Settings,
    title: "Technical Support",
    faqs: [
      {
        question: "The website isn't loading properly. What should I do?",
        answer: "Try clearing your browser cache, updating to the latest browser version, or switching browsers. If the issue persists, contact our technical support team."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page, enter your registered email, and follow the reset link sent to your inbox."
      },
      {
        question: "Can I use Landora on mobile?",
        answer: "Yes! Our website is fully responsive and works seamlessly on all mobile devices and tablets."
      }
    ]
  }
];

const quickLinks = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    color: "blue"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+92 303 7550673",
    action: "Call Now",
    color: "green"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "raozohaibofficial06@gmail.com",
    action: "Send Email",
    color: "purple"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Browse our guides",
    action: "View Docs",
    color: "orange"
  }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              How Can We <GradientText>Help You?</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-white/80">
              Search our knowledge base or browse categories below
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto pt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3C40]/60" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white"
              />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <AnimatedSection variant="slideUp" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="border-[#E7EAEF] hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full bg-${link.color}-100 flex items-center justify-center mx-auto`}>
                    <link.icon className={`w-8 h-8 text-${link.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111111] mb-1">{link.title}</h3>
                    <p className="text-sm text-[#3A3C40]">{link.description}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    {link.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60 mb-4">
              Frequently Asked
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
              Browse by <GradientText>Category</GradientText>
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <AnimatedSection key={categoryIndex} variant="slideUp" delay={categoryIndex * 0.1}>
                <Card className="border-[#E7EAEF]">
                  <CardHeader className="bg-[#FAFAFA]">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 rounded-lg bg-[#6139DB]/10 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-[#6139DB]" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-[#E7EAEF]">
                      {category.faqs.map((faq, faqIndex) => {
                        const faqId = `${categoryIndex}-${faqIndex}`;
                        const isExpanded = expandedFaq === faqId;
                        
                        return (
                          <div key={faqIndex} className="p-6">
                            <button
                              onClick={() => toggleFaq(faqId)}
                              className="w-full flex items-start justify-between gap-4 text-left group"
                            >
                              <span className="font-medium text-[#111111] group-hover:text-[#6139DB] transition-colors">
                                {faq.question}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-[#6139DB] flex-shrink-0 mt-0.5" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-[#3A3C40]/60 flex-shrink-0 mt-0.5" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="mt-4 text-[#3A3C40] leading-relaxed pl-0">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Still Need Help */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-6 text-white max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Still Need Help?
            </h2>
            <p className="text-lg text-white/90">
              Can't find what you're looking for? Our support team is ready to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Submit a Ticket
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
