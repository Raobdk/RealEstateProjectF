"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { GradientText } from "@/components/ui/gradient-text";
import { PageLoader } from "@/components/ui/loader";
import { 
  BarChart3, 
  Building2, 
  Users, 
  ClipboardList, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Eye, 
  Send,
  Sparkles,
  ArrowRight,
  Home,
  Calculator
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router, mounted]);

  if (!mounted || authLoading) {
    return <PageLoader text="Loading dashboard..." />;
  }

  if (!user) {
    return null;
  }

  const stats = [
    { 
      label: "Saved Properties", 
      value: "12", 
      icon: Building2, 
      color: "text-blue-500", 
      bg: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
      trend: "+3 this week"
    },
    { 
      label: "Inquiries Sent", 
      value: "5", 
      icon: Send, 
      color: "text-green-500", 
      bg: "bg-gradient-to-br from-green-500/20 to-green-600/10",
      border: "border-green-500/30",
      trend: "+2 this week"
    },
    { 
      label: "Site Visits", 
      value: "3", 
      icon: MapPin, 
      color: "text-purple-500", 
      bg: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30",
      trend: "+1 scheduled"
    },
    { 
      label: "Account Age", 
      value: "2 Months", 
      icon: Calendar, 
      color: "text-orange-500", 
      bg: "bg-gradient-to-br from-orange-500/20 to-orange-600/10",
      border: "border-orange-500/30",
      trend: "Since Oct 2025"
    },
  ];

  const recentActivity = [
    { 
      action: "Saved property", 
      property: "DHA Phase 6, 10 Marla Plot", 
      time: "2 hours ago",
      icon: Heart,
      color: "text-red-400"
    },
    { 
      action: "Viewed listing", 
      property: "Bahria Town, 5 Marla House", 
      time: "5 hours ago",
      icon: Eye,
      color: "text-blue-400"
    },
    { 
      action: "Sent inquiry", 
      property: "Model Town, Commercial Plot", 
      time: "1 day ago",
      icon: Send,
      color: "text-green-400"
    },
  ];

  return (
    <div className="relative py-16 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6139DB]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Container className="relative z-10 space-y-8 sm:space-y-10 md:space-y-12">
        {/* Hero Section with Enhanced Animation */}
        <AnimatedSection variant="slideUp">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#6139DB]/20 rounded-full blur-xl animate-pulse"></div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#6139DB] animate-pulse" />
                  <p className="text-sm uppercase tracking-[0.35em] text-white/60 font-semibold">
                    Welcome Back
                  </p>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  <GradientText className="animate-gradient">{user.name}</GradientText>
                </h1>
                <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
                  Track your property search journey and manage your saved listings.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="gradient" 
                  className="group shadow-lg shadow-[#6139DB]/50 hover:shadow-xl hover:shadow-[#6139DB]/70 transition-all duration-300" 
                  asChild
                >
                  <Link href="/properties" className="flex items-center gap-2">
                    Browse Properties
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Cards with Hover Effects */}
        <AnimatedSection variant="slideUp" className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className={`glass border ${stat.border} ${stat.bg} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative overflow-hidden`}>
                {/* Shimmer effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}></div>
                
                <CardContent className="relative py-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <TrendingUp className={`w-5 h-5 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-white bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/40 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${stat.color.replace('text-', 'bg-')} animate-pulse`}></span>
                      {stat.trend}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </AnimatedSection>

        {/* Activity and Quick Actions with Modern Design */}
        <AnimatedSection variant="slideUp" className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity with Timeline */}
          <Card className="glass border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#6139DB]/20 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-[#6139DB]" />
                  </div>
                  Recent Activity
                </CardTitle>
                <div className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                  Last 24 hours
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="group relative pl-6 pb-6 last:pb-2 transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline line */}
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-0.5 h-full bg-gradient-to-b from-[#6139DB]/50 to-transparent"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-br ${activity.color.replace('text-', 'from-')} to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <activity.icon className="w-3 h-3 text-white" />
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    <p className="text-sm text-white leading-relaxed">
                      <span className="font-semibold">{activity.action}</span>
                      <span className="text-white/50"> in </span>
                      <span className="text-[#6139DB] font-medium hover:underline cursor-pointer">
                        {activity.property}
                      </span>
                    </p>
                    <p className="text-xs text-white/40 mt-2 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <ClipboardList className="w-8 h-8 text-white/30" />
                  </div>
                  <p className="text-sm text-white/60">No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions with Hover Effects */}
          <Card className="glass border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { href: "/properties", label: "Browse All Properties", icon: Home, color: "from-blue-500 to-purple-500" },
                { href: "/tools/construction-calculator", label: "Construction Calculator", icon: Calculator, color: "from-green-500 to-emerald-500" },
                { href: "/tools/area-converter", label: "Area Unit Converter", icon: BarChart3, color: "from-orange-500 to-red-500" },
                { href: "/#contact", label: "Contact Support", icon: Users, color: "from-purple-500 to-pink-500" },
              ].map((action, index) => (
                <Link href={action.href} key={index}>
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} opacity-80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium group-hover:text-white transition-colors">
                          {action.label}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Recommended Properties with Modern Cards */}
        <AnimatedSection variant="slideUp">
          <Card className="glass border border-white/10 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6139DB] to-purple-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  Recommended for You
                </CardTitle>
                <Button variant="ghost" className="text-[#6139DB] hover:text-white" asChild>
                  <Link href="/properties" className="flex items-center gap-1">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { id: 1, location: "DHA Phase 6, Lahore", price: "2.5M", type: "Plot", size: "10 Marla" },
                  { id: 2, location: "Bahria Town, Islamabad", price: "8.2M", type: "House", size: "5 Marla" },
                  { id: 3, location: "Model Town, Karachi", price: "4.7M", type: "Commercial", size: "8 Marla" }
                ].map((property, index) => (
                  <div
                    key={property.id}
                    className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 overflow-hidden hover:border-[#6139DB]/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Property Image Placeholder with Gradient */}
                    <div className="relative h-48 bg-gradient-to-br from-[#6139DB]/30 via-purple-500/20 to-blue-500/30 overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Floating badge */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-semibold border border-white/20">
                        {property.type}
                      </div>
                      
                      {/* Favorite button */}
                      <button className="absolute top-3 right-3 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/80 transition-colors group/heart">
                        <Heart className="w-4 h-4 text-white group-hover/heart:fill-white transition-all" />
                      </button>

                      {/* Property size overlay */}
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-black font-bold">
                        {property.size}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[#6139DB] transition-colors">
                          Premium {property.type}
                        </h4>
                        <p className="text-white/60 text-sm flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {property.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div>
                          <p className="text-xs text-white/40 mb-0.5">Price</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-[#6139DB] to-purple-400 bg-clip-text text-transparent">
                            PKR {property.price}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-[#6139DB] to-purple-600 hover:from-[#4F2DB5] hover:to-purple-700 text-white shadow-lg shadow-[#6139DB]/30 group/btn"
                        >
                          View
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-8">
                <Button 
                  variant="gradient" 
                  size="lg"
                  className="group shadow-2xl shadow-[#6139DB]/30 hover:shadow-[#6139DB]/50 transition-all duration-300" 
                  asChild
                >
                  <Link href="/properties" className="flex items-center gap-2">
                    View All Properties
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Container>
    </div>
  );
}

