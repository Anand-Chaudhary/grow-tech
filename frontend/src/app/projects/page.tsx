"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Navbar,
  Footer,
} from "@/component/landing";
import { getLandingData, LandingPageData, ProjectItem } from "@/lib/api";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function ProjectsPage() {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    getLandingData()
      .then((data) => {
        if (data) setLandingData(data);
      })
      .catch((err) => {
        console.warn("[Projects Page] Failed to fetch data:", err);
      });
  }, []);

  const projects = landingData?.projects || [
    {
      id: "proj-1",
      number: "01",
      category: "B2B SaaS Platform",
      title: "Clinical Care Workflow & Real-Time Booking Engine",
      description:
        "Architecture overhaul reducing initial page load from 4.2s to 0.4s, handling 50k daily active patient appointments with sub-second response times.",
      tags: ["Next.js 15", "TailwindCSS", "Edge Caching", "HIPAA Ready"],
      client: "Apex Health Group",
      metrics: "0.4s LCP • 99.98% Uptime",
      accentBg: "#243629",
    },
    {
      id: "proj-2",
      number: "02",
      category: "Headless E-Commerce",
      title: "Artisanal Furniture Direct-To-Consumer Portal",
      description:
        "Custom Shopify storefront with 3D product previews and localized multi-currency checkout achieving +42% mobile conversion rate.",
      tags: ["Shopify Storefront", "Next.js", "Three.js", "Stripe API"],
      client: "Terra Living Atelier",
      metrics: "+42% Checkout Conversion",
      accentBg: "#1F2E23",
    },
    {
      id: "proj-3",
      number: "03",
      category: "Fintech & Wealth",
      title: "Private Equity Portfolio Analytics & Capital Calls",
      description:
        "High-density financial portal with interactive fee modeling, audit trails, and automated institutional reporting for fund managers.",
      tags: ["TypeScript", "Next.js App Router", "Prisma", "PostgreSQL"],
      client: "Beacon Capital Partners",
      metrics: "0.2s TTFB • $120M+ Managed",
      accentBg: "#1A2E20",
    },
    {
      id: "proj-4",
      number: "04",
      category: "Creative Agency",
      title: "Design Studio Showcase & Interactive Archive",
      description:
        "Fluid motion experiences with WebGL particle systems and zero layout shift, winning multiple international design and engineering awards.",
      tags: ["GSAP Motion", "WebGL", "Next.js", "TailwindCSS"],
      client: "Lumina Creative Studio",
      metrics: "100/100 Lighthouse Performance",
      accentBg: "#293D2E",
    },
  ];

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF6EC] selection:bg-[#3D9129]/20 selection:text-[#243629]">
      {/* Floating Pill Header */}
      <Navbar navigation={landingData?.navigation} />

      {/* Hero Header */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#3D9129]" />
            SELECTED WORK & CASE STUDIES
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#16130F] font-normal tracking-[-0.03em] leading-[1.08]">
            High-performance software <br />
            <span className="text-[#3D9129]">in production.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#5A554C] leading-relaxed max-w-2xl font-light">
            Explore live case studies demonstrating how our architectural choices translate into real business numbers: faster conversions, higher engagement, and flawless stability.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#243629] text-white font-medium shadow-sm"
                  : "bg-white text-[#5A554C] border border-[#E2D9C6] hover:bg-[#FAF4E6]"
              }`}
            >
              {cat === "ALL" ? "All Case Studies" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="rounded-3xl p-8 sm:p-10 text-white transition-all shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group"
              style={{ backgroundColor: project.accentBg || "#243629" }}
            >
              <div>
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between text-xs text-white/70 font-mono mb-6 pb-4 border-b border-white/10">
                  <span className="uppercase tracking-wider">
                    {project.category || "Case Study"}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-white font-mono text-xs">
                    {project.number || String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-white mb-4 leading-snug group-hover:text-[#A2E391] transition-colors">
                  {project.title}
                </h2>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Client & Results Badge Row */}
                <div className="grid grid-cols-2 gap-4 py-4 px-4 rounded-2xl bg-black/25 mb-6 text-xs">
                  <div>
                    <span className="text-white/50 block text-[10px] font-mono uppercase tracking-wider mb-0.5">
                      Client
                    </span>
                    <span className="text-white font-medium text-sm">
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px] font-mono uppercase tracking-wider mb-0.5">
                      Measured Impact
                    </span>
                    <span className="text-[#A2E391] font-semibold text-sm flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {project.metrics}
                    </span>
                  </div>
                </div>

                {/* Tech Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center w-full">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#16130F] mb-6">
          Have a project that demands high performance?
        </h2>
        <p className="text-sm sm:text-base text-[#5A554C] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Whether you are launching a greenfield application or rebuilding a legacy storefront, we can help you hit sub-second speeds.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-[#243629] hover:bg-[#1a281e] active:scale-95 transition-all shadow-md"
        >
          <span>Discuss Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <Footer footer={landingData?.footer} navigation={landingData?.navigation} />
    </main>
  );
}
