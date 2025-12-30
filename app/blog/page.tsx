"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Tag, Search, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Market Trends", "Investment Tips", "Legal Guides", "Property News"];

  // Mock blog data - Replace with actual API call
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title: "Top 10 Real Estate Investment Tips for 2024",
        excerpt: "Discover the best strategies to maximize your real estate investments in the current market conditions.",
        category: "Investment Tips",
        author: "Ahmed Ali",
        date: "2024-01-15",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
        featured: true,
      },
      {
        id: "2",
        title: "Understanding Property Laws in Pakistan",
        excerpt: "A comprehensive guide to property ownership, transfer laws, and legal requirements in Pakistan.",
        category: "Legal Guides",
        author: "Fatima Khan",
        date: "2024-01-10",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
        featured: false,
      },
      {
        id: "3",
        title: "DHA Lahore Phase 11 - Complete Analysis",
        excerpt: "In-depth review of DHA Phase 11 location, pricing trends, and investment potential.",
        category: "Market Trends",
        author: "Hassan Raza",
        date: "2024-01-08",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
        featured: false,
      },
      {
        id: "4",
        title: "How to Calculate Property Valuation",
        excerpt: "Learn the methods and factors that determine the market value of residential and commercial properties.",
        category: "Investment Tips",
        author: "Sara Malik",
        date: "2024-01-05",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800",
        featured: false,
      },
      {
        id: "5",
        title: "Islamabad Real Estate Market Update Q1 2024",
        excerpt: "Latest trends, price movements, and investment opportunities in Islamabad's property market.",
        category: "Market Trends",
        author: "Ali Butt",
        date: "2024-01-03",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        featured: true,
      },
      {
        id: "6",
        title: "Complete Guide to Home Loans in Pakistan",
        excerpt: "Everything you need to know about securing a mortgage, interest rates, and eligibility criteria.",
        category: "Legal Guides",
        author: "Zainab Ahmed",
        date: "2023-12-28",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800",
        featured: false,
      },
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setLoading(false);
    }, 800);
  }, []);

  // Filter posts using useMemo to avoid cascading renders
  const filteredPostsMemo = useMemo(() => {
    let filtered = posts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, posts]);

  // Update filtered posts when memo changes
  useEffect(() => {
    setFilteredPosts(filteredPostsMemo);
  }, [filteredPostsMemo]);

  const featuredPosts = posts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#111111] to-[#3A3C40]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center space-y-4 text-white max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.35em] text-white/60">
              Insights & Updates
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Landora <GradientText>Blog</GradientText>
            </h1>
            <p className="text-lg text-white/80">
              Stay informed with the latest news, trends, and expert advice in Pakistan&apos;s real estate market
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-[#E7EAEF] bg-white">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A3C40]/50" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-[#6139DB] hover:bg-[#6139DB]/90"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === "All" && !searchQuery && (
        <section className="py-12 sm:py-16 bg-white">
          <Container>
            <AnimatedSection variant="slideUp" className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                Featured <GradientText>Articles</GradientText>
              </h2>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post, index) => (
                <AnimatedSection key={post.id} variant="slideUp" delay={index * 0.1}>
                  <Link href={`/blog/${post.id}`}>
                    <Card className="group cursor-pointer border-[#E7EAEF] hover:shadow-lg transition-all overflow-hidden h-full">
                      <div className="aspect-video bg-gray-200 overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3 text-sm text-[#3A3C40]/70">
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#111111] mb-2 group-hover:text-[#6139DB] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-[#3A3C40] mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-[#3A3C40]/70">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 sm:py-16">
        <Container>
          <AnimatedSection variant="slideUp" className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                {selectedCategory !== "All" ? selectedCategory : "Latest"} <GradientText>Articles</GradientText>
              </h2>
              <span className="text-[#3A3C40]">{filteredPosts.length} articles</span>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-[#E7EAEF] animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card className="border-[#E7EAEF] text-center py-16">
              <CardContent>
                <Search className="w-16 h-16 text-[#3A3C40]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#111111] mb-2">No Articles Found</h3>
                <p className="text-[#3A3C40] mb-6">
                  Try adjusting your search or filter to find what you&apos;re looking for
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="bg-[#6139DB] hover:bg-[#6139DB]/90"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <AnimatedSection key={post.id} variant="slideUp" delay={index * 0.05}>
                  <Link href={`/blog/${post.id}`}>
                    <Card className="group cursor-pointer border-[#E7EAEF] hover:shadow-lg transition-all overflow-hidden h-full">
                      <div className="aspect-video bg-gray-200 overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3 text-sm text-[#3A3C40]/70">
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#6139DB] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#3A3C40] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-[#3A3C40]/70">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center text-[#6139DB] font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-[#6139DB] to-[#7B68EE]">
        <Container>
          <AnimatedSection variant="slideUp" className="text-center text-white max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-8">
              Get the latest real estate news, market insights, and investment tips delivered to your inbox
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white text-[#111111]"
              />
              <Button className="bg-[#111111] hover:bg-[#111111]/90 text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
