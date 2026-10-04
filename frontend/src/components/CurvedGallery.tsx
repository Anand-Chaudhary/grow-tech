"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Shield, Sparkles, CheckCircle2, X } from "lucide-react";

interface ProjectScreen {
  id: string;
  name: string;
  category: string;
  url: string;
  headline: string;
  subline: string;
  result: string;
  lcp: string;
  image: string;
  specs: string[];
}

const SCREENS: ProjectScreen[] = [
  {
    id: "apex",
    name: "Apex Health Studio",
    category: "Sports Medicine & Clinic",
    url: "apexhealth.clinic",
    headline: "Faster recovery for active bodies.",
    subline: "Direct mobile booking pipeline with zero lag.",
    result: "+118% consultation bookings",
    lcp: "0.6s LCP",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    specs: ["Next.js 16 App Router", "Direct Cal.com integration", "Sub-second mobile checkout"],
  },
  {
    id: "terra",
    name: "Terra Architectural",
    category: "Commercial Building Materials",
    url: "terra-materials.com",
    headline: "Facades engineered for commercial scale.",
    subline: "Searchable BIM catalog with 1-click sample dispatch.",
    result: "<50ms catalog search time",
    lcp: "0.7s LCP",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    specs: ["Algolia InstantSearch", "Edge image optimization", "100% Core Web Vitals score"],
  },
  {
    id: "beacon",
    name: "Beacon Wealth Partners",
    category: "Fiduciary Wealth Advisory",
    url: "beaconwealth.com",
    headline: "Stewardship for multi-generational wealth.",
    subline: "Quiet luxury client intake and transparent fee modeling.",
    result: "$12.4M new client intake",
    lcp: "0.5s LCP",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    specs: ["Tailored client onboarding flow", "Encrypted document exchange", "SOC2-compliant hosting"],
  },
  {
    id: "lumina",
    name: "Lumina Dental & Clinical",
    category: "Preventive Healthcare",
    url: "luminadental.co",
    headline: "Modern clinical care without phone tag.",
    subline: "Real-time calendar booking and insurance verification.",
    result: "Zero patient booking dropoff",
    lcp: "0.6s LCP",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    specs: ["Multi-provider scheduling", "Automated SMS reminders", "Lighthouse 100 performance"],
  },
  {
    id: "velox",
    name: "Velox Freight Systems",
    category: "Logistics & Transport",
    url: "veloxlogistics.io",
    headline: "Freight intelligence for high-volume lanes.",
    subline: "Instant LTL quoting engine and dispatch automation.",
    result: "18,400 monthly loads",
    lcp: "0.6s LCP",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    specs: ["Dynamic rate calculator", "Real-time fleet tracking map", "Supabase edge database"],
  },
  {
    id: "kova",
    name: "Kova Interior Architecture",
    category: "Interiors & Design",
    url: "kovastudio.design",
    headline: "Spaces shaped by light and enduring texture.",
    subline: "High-impact editorial portfolio and inquiry flow.",
    result: "0.5s first contentful paint",
    lcp: "0.6s LCP",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    specs: ["Editorial image galleries", "Sanity CMS integration", "Zero layout shift (CLS 0.00)"],
  },
  {
    id: "craft",
    name: "Craft & Grain Roasters",
    category: "Specialty Commerce",
    url: "craftandgrain.shop",
    headline: "Single-origin coffees delivered on schedule.",
    subline: "Headless Stripe subscription engine with 0.7s checkout.",
    result: "+72% recurring subscription GMV",
    lcp: "0.7s LCP",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    specs: ["Headless Shopify storefront", "Stripe billing recurring engine", "Sub-second cart drawer"],
  },
];

export default function CurvedGallery() {
  const [selectedId, setSelectedId] = useState<string>("lumina");
  const [inspectingProject, setInspectingProject] = useState<ProjectScreen | null>(null);

  // 3D Arc Curvature parameters (7 cards)
  const getRotation = (idx: number) => {
    const angles = [-18, -12, -6, 0, 6, 12, 18];
    return angles[idx] ?? 0;
  };

  const getTranslateY = (idx: number) => {
    const trans = [22, 10, 2, -6, 2, 10, 22];
    return trans[idx] ?? 0;
  };

  const getTranslateZ = (idx: number) => {
    const depth = [-60, -25, -5, 10, -5, -25, -60];
    return depth[idx] ?? 0;
  };

  return (
    <div className="w-full pt-4 pb-12 relative z-10">
      {/* Curved Perspective Carousel Container */}
      <div className="overflow-x-auto overflow-y-visible py-8 px-4 scrollbar-none perspective-[1400px]">
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 min-w-[1100px] lg:min-w-0 max-w-[1440px] mx-auto py-4">
          {SCREENS.map((screen, idx) => {
            const rotY = getRotation(idx);
            const transY = getTranslateY(idx);
            const transZ = getTranslateZ(idx);
            const isSelected = selectedId === screen.id;

            return (
              <motion.div
                key={screen.id}
                onClick={() => setSelectedId(screen.id)}
                onMouseEnter={() => setSelectedId(screen.id)}
                animate={{
                  y: isSelected ? transY - 18 : transY,
                  rotateY: isSelected ? 0 : rotY,
                  z: isSelected ? transZ + 40 : transZ,
                  scale: isSelected ? 1.05 : 0.96,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex-shrink-0 w-[240px] sm:w-[270px] lg:w-[290px] h-[390px] sm:h-[440px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer select-none border transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                  isSelected
                    ? "border-[#C8F169] ring-2 ring-[#C8F169]/30"
                    : "border-white/10 hover:border-white/30"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={screen.image}
                  alt={screen.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E09] via-[#080E09]/60 to-[#080E09]/30 pointer-events-none" />

                {/* Card Top: Browser URL pill & Speed Metric */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080E09]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#F4FDF6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8F169] animate-pulse" />
                    <span>{screen.url}</span>
                  </div>

                  <span className="font-mono text-[11px] font-semibold text-[#080E09] bg-[#C8F169] px-2.5 py-0.5 rounded-full shadow-sm">
                    {screen.lcp}
                  </span>
                </div>

                {/* Card Bottom: Editorial Information */}
                <div className="relative z-10 p-5 sm:p-6 mt-auto flex flex-col justify-end">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#C8F169] mb-1.5 font-medium">
                    {screen.category}
                  </span>

                  <h3 className="text-[19px] sm:text-[21px] font-semibold text-[#F4FDF6] leading-tight line-clamp-2">
                    {screen.headline}
                  </h3>

                  <p className="text-[13px] text-[#9BB3A2] mt-2 line-clamp-2 leading-relaxed">
                    {screen.subline}
                  </p>

                  <div className="pt-3.5 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[12px] text-[#C8F169] font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {screen.result}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingProject(screen);
                      }}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#C8F169] hover:text-[#080E09] text-white flex items-center justify-center transition-colors"
                      title="Inspect case study"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Under-Gallery Three High-Trust Pillars (Matching Reference Image 1) */}
      <div className="max-w-[1100px] mx-auto mt-8 sm:mt-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/10 pt-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[#C8F169] mb-2 font-medium">
            <Zap className="w-4 h-4" />
            <span>Sub-Second Performance</span>
          </div>
          <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#F4FDF6]">
            Guaranteed Core Web Vitals
          </h4>
          <p className="text-[15px] text-[#9BB3A2] mt-2 leading-relaxed">
            Every page is engineered on Next.js 16 Edge architecture. Sub-second Largest Contentful Paint on mobile 4G networks is baked into our contract.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[#C8F169] mb-2 font-medium">
            <Shield className="w-4 h-4" />
            <span>100% Repository Handover</span>
          </div>
          <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#F4FDF6]">
            Zero Hostage Code Guarantee
          </h4>
          <p className="text-[15px] text-[#9BB3A2] mt-2 leading-relaxed">
            We build directly in your GitHub and Cloudflare accounts. You own the repository, DNS, and hosting from day zero. No proprietary lock-in.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-[#C8F169] mb-2 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Conversion Engineering</span>
          </div>
          <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#F4FDF6]">
            Frictionless Lead Capture
          </h4>
          <p className="text-[15px] text-[#9BB3A2] mt-2 leading-relaxed">
            Strategic enquiry funnels, instant mobile calendar booking, and clear value messaging designed to turn casual visitors into paying clients.
          </p>
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <AnimatePresence>
        {inspectingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectingProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0F1A12] border border-[#C8F169]/40 rounded-[32px] p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
            >
              <button
                onClick={() => setInspectingProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[12px] uppercase tracking-wider text-[#080E09] bg-[#C8F169] px-3 py-1 rounded-full font-semibold">
                  {inspectingProject.lcp}
                </span>
                <span className="text-[#9BB3A2] font-mono text-[13px]">
                  {inspectingProject.url}
                </span>
              </div>

              <h3 className="text-[28px] sm:text-[34px] font-semibold text-[#F4FDF6] leading-tight">
                {inspectingProject.name}
              </h3>
              <p className="text-[16px] text-[#9BB3A2] mt-3 leading-relaxed">
                {inspectingProject.headline} {inspectingProject.subline}
              </p>

              <div className="my-6 p-4 rounded-2xl bg-[#142318] border border-white/10 flex items-center justify-between">
                <span className="text-[14px] text-[#9BB3A2]">Primary Business Result:</span>
                <span className="font-mono text-[15px] font-bold text-[#C8F169]">
                  {inspectingProject.result}
                </span>
              </div>

              <div className="space-y-2 mb-8">
                <div className="font-mono text-[12px] uppercase tracking-wider text-[#9BB3A2] mb-2">
                  Technical Architecture:
                </div>
                {inspectingProject.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-2.5 text-[14px] text-[#F4FDF6]">
                    <CheckCircle2 className="w-4 h-4 text-[#C8F169] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/review"
                  onClick={() => setInspectingProject(null)}
                  className="btn-primary-leaf flex-1 h-[52px] text-[15px]"
                >
                  Book site review for your business
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
