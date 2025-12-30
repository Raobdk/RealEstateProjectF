"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoader } from "@/components/ui/loader";
import { Search, Mail, Phone, Building2 } from "lucide-react";
import { userAPI } from "@/lib/api";
import Link from "next/link";

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  createdAt: string;
  stats?: {
    totalListings?: number;
    activeListings?: number;
    soldProperties?: number;
  };
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setError(null);
        const response = await userAPI.getAll();
        const allUsers = response.data.data.users || response.data.data || [];
        
        // Filter only active agents
        const activeAgents = allUsers.filter(
          (user: Agent) => user.role === "agent" && user.status === "active"
        );
        
        setAgents(activeAgents);
        setFilteredAgents(activeAgents);
      } catch (err) {
        console.error("Failed to fetch agents:", err);
        setError("Unable to load agents. Please try again later.");
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAgents(agents);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(query) ||
        agent.email.toLowerCase().includes(query) ||
        (agent.phone && agent.phone.includes(query))
    );
    setFilteredAgents(filtered);
  }, [searchQuery, agents]);

  if (loading) {
    return <PageLoader text="Loading agents..." />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 sm:py-16">
      <Container className="space-y-8">
        {/* Header */}
        <AnimatedSection variant="slideUp" className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-[#3A3C40]/60">
            Our Team
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
            Meet Our <GradientText>Expert Agents</GradientText>
          </h1>
          <p className="text-[#3A3C40] max-w-2xl mx-auto">
            Connect with professional real estate agents who can help you find your dream property.
          </p>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection variant="slideUp">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3C40]/60" />
              <Input
                type="text"
                placeholder="Search agents by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base border-[#E7EAEF]"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Agents Grid */}
        {error ? (
          <AnimatedSection variant="slideUp" className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">
                Failed to Load Agents
              </h3>
              <p className="text-[#3A3C40] mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </AnimatedSection>
        ) : filteredAgents.length === 0 ? (
          <AnimatedSection variant="slideUp" className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">
                {searchQuery ? "No Agents Found" : "No Agents Available"}
              </h3>
              <p className="text-[#3A3C40] mb-4">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Check back soon for available agents"}
              </p>
              {searchQuery && (
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              )}
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection variant="slideUp" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAgents.map((agent) => (
              <Card
                key={agent._id}
                className="bg-white border-[#E7EAEF] hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6139DB] to-[#6139DB]/70 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">
                      {agent.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <CardTitle className="text-center text-xl">
                    {agent.name}
                  </CardTitle>
                  <p className="text-center text-sm text-[#3A3C40]">
                    Real Estate Agent
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {agent.email && (
                      <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
                        <Mail className="w-4 h-4 text-[#6139DB]" />
                        <span className="truncate">{agent.email}</span>
                      </div>
                    )}
                    {agent.phone && (
                      <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
                        <Phone className="w-4 h-4 text-[#6139DB]" />
                        <span>{agent.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
                      <Building2 className="w-4 h-4 text-[#6139DB]" />
                      <span>
                        {agent.stats?.totalListings || 0} Listings
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E7EAEF]">
                    <Button className="w-full bg-[#6139DB] hover:bg-[#6139DB]/90" asChild>
                      <Link href={`/agents/${agent._id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AnimatedSection>
        )}

        {/* Call to Action */}
        <AnimatedSection variant="slideUp" className="text-center py-12">
          <Card className="bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80 border-none">
            <CardContent className="py-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Want to Become an Agent?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join our team of professional real estate agents and start your career with Landora.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/auth/register?role=agent">
                  Register as Agent
                </Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Container>
    </div>
  );
}
