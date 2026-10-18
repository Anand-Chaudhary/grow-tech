"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { PricingPackageItem, PricingSectionData } from "@/lib/api";

interface PricingSectionProps {
  packages?: PricingPackageItem[];
  pricingSection?: PricingSectionData;
  onSelectPlan?: (tier: string) => void;
}

const DEFAULT_PACKAGES: PricingPackageItem[] = [
  {
    id: "pkg-launch",
    tier: "LAUNCH",
    name: "Launch Package",
    bestFor: "Early-stage startups and lean teams needing an ultra-fast MVP",
    features: [
      "Next.js 15 & React 19 App Router",
      "Sub-second Largest Contentful Paint (<0.8s)",
      "Mobile-first responsive viewports",
      "Technical SEO structure & Schema markup",
      "100% code & domain ownership",
      "14 days post-launch support",
    ],
    priceFrom: 4999,
    currency: "USD",
    priceNote: "Fixed scope • 2-3 weeks turnaround",
    isHighlighted: false,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "pkg-growth",
    tier: "GROWTH",
    name: "Growth Package",
    bestFor: "Scaling brands demanding conversion optimization and rock-solid uptime",
    features: [
      "Everything in Launch Package",
      "Headless CMS or Shopify checkout integration",
      "Conversion Rate Optimization (CRO) audit",
      "Guaranteed 95+ Core Web Vitals benchmark",
      "Automated lead capture & analytics tracking",
      "Dedicated Slack channel & priority SLA",
      "30 days post-launch warranty",
    ],
    priceFrom: 9999,
    currency: "USD",
    priceNote: "Most popular • 4-6 weeks delivery",
    isHighlighted: true,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "pkg-scale",
    tier: "SCALE",
    name: "Scale & Enterprise",
    bestFor: "Established enterprises and high-load web applications",
    features: [
      "Everything in Growth Package",
      "Custom full-stack web applications & microservices",
      "High-throughput edge caching & database design",
      "Role-based access control & security compliance",
      "Automated CI/CD test suite & zero-downtime deploy",
      "Quarterly technical roadmap & SLA guarantee",
    ],
    priceFrom: null,
    currency: "USD",
    priceNote: "Custom quote based on technical scope",
    isHighlighted: false,
    isActive: true,
    sortOrder: 3,
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  packages,
  pricingSection,
  onSelectPlan,
}) => {
  const activePackages =
    packages && packages.length > 0
      ? packages.filter((p) => p.isActive !== false)
      : DEFAULT_PACKAGES;

  const badge = pricingSection?.badge || "Transparent Pricing";
  const heading = pricingSection?.heading || "Engineered packages";
  const highlight = pricingSection?.highlight || "built to scale.";
  const subhead =
    pricingSection?.subhead ||
    "Guaranteed sub-second speed, 100% client code ownership, and zero agency markups. Select a package to start your inquiry.";

  const handlePlanClick = (tier: string) => {
    if (onSelectPlan) {
      onSelectPlan(tier);
    }
    // Smooth scroll to contact section
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event for plan selection
      window.dispatchEvent(
        new CustomEvent("growtech:select-plan", { detail: { tier } })
      );
    }
  };

  const formatPrice = (price: number | null | undefined, currency: string) => {
    if (price === null || price === undefined) return "Custom";
    const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : `${currency} `;
    return `${symbol}${price.toLocaleString()}`;
  };

  return (
    <section id="pricing" className="w-full py-20 sm:py-28 border-t border-[#E2D9C6]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-4">
            <Zap className="w-3.5 h-3.5 text-[#3D9129]" />
            {badge.toUpperCase()}
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#16130F] font-normal tracking-[-0.03em] leading-[1.08]">
            {heading} <br />
            <span className="text-[#3D9129]">{highlight}</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#5A554C] leading-relaxed max-w-2xl font-light">
            {subhead}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {activePackages.map((pkg) => {
            const isHighlighted = pkg.isHighlighted;
            return (
              <div
                key={pkg.id || pkg.tier}
                className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                  isHighlighted
                    ? "bg-[#243629] text-white shadow-xl ring-2 ring-[#3D9129] lg:-translate-y-2"
                    : "bg-white text-[#16130F] border border-[#E2D9C6] shadow-sm hover:border-[#3D9129]/50 hover:shadow-md"
                }`}
              >
                {/* Popular Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-[#3D9129] text-white text-[11px] font-mono font-semibold tracking-wider flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#A2E391]" />
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Tier Name */}
                  <span
                    className={`text-xs font-mono uppercase tracking-widest block mb-3 font-semibold ${
                      isHighlighted ? "text-[#A2E391]" : "text-[#5A554C]"
                    }`}
                  >
                    {pkg.tier} TIER
                  </span>

                  <h3
                    className={`font-serif text-2xl sm:text-3xl mb-3 ${
                      isHighlighted ? "text-white" : "text-[#16130F]"
                    }`}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${
                      isHighlighted ? "text-white/80" : "text-[#5A554C]"
                    }`}
                  >
                    {pkg.bestFor}
                  </p>

                  {/* Price Tag */}
                  <div className="py-4 border-y border-current/15 mb-8">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl sm:text-5xl font-normal tracking-tight">
                        {formatPrice(pkg.priceFrom, pkg.currency || "USD")}
                      </span>
                      {pkg.priceFrom && (
                        <span
                          className={`text-xs font-mono ${
                            isHighlighted ? "text-white/60" : "text-[#5A554C]"
                          }`}
                        >
                          / project
                        </span>
                      )}
                    </div>
                    {pkg.priceNote && (
                      <span
                        className={`block text-[11px] font-mono mt-1.5 ${
                          isHighlighted ? "text-[#A2E391]" : "text-[#3D9129]"
                        }`}
                      >
                        {pkg.priceNote}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span
                      className={`block text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        isHighlighted ? "text-white/70" : "text-[#5A554C]"
                      }`}
                    >
                      Included Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features?.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`text-xs sm:text-sm flex items-start gap-2.5 leading-snug ${
                            isHighlighted ? "text-white/90" : "text-[#5A554C]"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isHighlighted ? "text-[#A2E391]" : "text-[#3D9129]"
                            }`}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Selection CTA Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handlePlanClick(pkg.tier)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
                      isHighlighted
                        ? "bg-[#3D9129] text-white hover:bg-[#347d23] shadow-md"
                        : "bg-[#243629] text-white hover:bg-[#1a281e]"
                    }`}
                  >
                    <span>
                      {pkg.tier === "SCALE" ? "Discuss Custom Scope" : `Select ${pkg.name.replace(/ Package$/, "")}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF4E6] border border-[#E2D9C6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A554C]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#3D9129] shrink-0" />
            <span>
              All packages include 100% repository ownership, domain DNS configuration, and Lighthouse sub-second performance guarantees.
            </span>
          </div>
          <Link
            href="/contact"
            className="text-[#243629] font-semibold hover:text-[#3D9129] underline underline-offset-4 whitespace-nowrap"
          >
            Need a custom advisory contract? Talk to us →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
