"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Navbar,
  Footer,
} from "@/component/landing";
import { getLandingData, LandingPageData, ServiceGridItem } from "@/lib/api";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);

  useEffect(() => {
    getLandingData()
      .then((data) => {
        if (data) setLandingData(data);
      })
      .catch((err) => {
        console.warn("[Services Page] Failed to fetch data:", err);
      });
  }, []);

  const services = landingData?.services || [
    {
      id: "srv-1",
      number: "01",
      title: "Sub-Second Next.js & React Engineering",
      description:
        "Bespoke web applications built for speed, zero layout shift, and enterprise reliability. Every millisecond counts toward search rankings and conversions.",
      details: [
        "React Server Components & Next.js App Router",
        "Sub-second Largest Contentful Paint (LCP < 0.8s)",
        "Zero bloated third-party dependencies",
        "Edge caching and global CDN distribution",
      ],
    },
    {
      id: "srv-2",
      number: "02",
      title: "High-Converting Headless E-Commerce",
      description:
        "Custom storefronts designed to maximize average order value and eliminate checkout friction with Shopify and Stripe.",
      details: [
        "Single-step checkout funnels",
        "Instant client-side catalog search",
        "Multi-currency & localized pricing",
        "99.99% uptime during peak holiday sales",
      ],
    },
    {
      id: "srv-3",
      number: "03",
      title: "Full-Stack Custom Software & APIs",
      description:
        "Robust backend architectures, real-time database synchronizations, and scalable microservices engineered to support rapid user growth.",
      details: [
        "Node.js, TypeScript & Prisma ORM",
        "High-throughput REST & GraphQL endpoints",
        "Role-based access control & tokenized auth",
        "Automated continuous integration & deployment",
      ],
    },
    {
      id: "srv-4",
      number: "04",
      title: "Technical SEO & Core Web Vitals Optimization",
      description:
        "Guaranteed 95+ Google Lighthouse scores across Performance, Accessibility, and Best Practices to ensure dominant organic search visibility.",
      details: [
        "Strict semantic HTML5 heading hierarchies",
        "Dynamic OpenGraph & JSON-LD schema generation",
        "Next-gen AVIF & WebP image optimization",
        "Zero cumulative layout shift (CLS = 0.00)",
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF6EC] selection:bg-[#3D9129]/20 selection:text-[#243629]">
      {/* Floating Pill Header */}
      <Navbar navigation={landingData?.navigation} />

      {/* Hero Header */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-4">
            <Layers className="w-3.5 h-3.5 text-[#3D9129]" />
            OUR CAPABILITIES
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#16130F] font-normal tracking-[-0.03em] leading-[1.08]">
            Software engineered for <br />
            <span className="text-[#3D9129]">speed, scale & conversion.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#5A554C] leading-relaxed max-w-2xl font-light">
            We don't build generic template sites. We engineer high-velocity digital products with client-owned code, zero lock-in, and measurable business impact.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="bg-white rounded-3xl border border-[#E2D9C6] p-8 sm:p-10 shadow-sm hover:border-[#3D9129]/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="font-serif text-4xl sm:text-5xl text-[#3D9129] font-light block mb-6">
                  {service.number || String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#16130F] mb-4 leading-snug group-hover:text-[#3D9129] transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-[#5A554C] leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {service.details && service.details.length > 0 && (
                <div className="pt-6 border-t border-[#E2D9C6]/60">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#16130F] mb-3 font-semibold">
                    Core Deliverables
                  </h3>
                  <ul className="space-y-2.5">
                    {service.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-[#5A554C] flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#3D9129] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees / Quality Pillars */}
      <section className="py-16 bg-[#FAF4E6] border-y border-[#E2D9C6]/80 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5A554C] block mb-2">
              THE GROW TECH STANDARD
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#16130F]">
              Built to grow with your business.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E2D9C6] space-y-3">
              <Zap className="w-6 h-6 text-[#3D9129]" />
              <h3 className="font-serif text-lg text-[#16130F]">Sub-Second Speed</h3>
              <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
                Every line of code is optimized for instantaneous loading. Zero sluggish JavaScript bundles or unnecessary render-blocking scripts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2D9C6] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#243629]" />
              <h3 className="font-serif text-lg text-[#16130F]">100% Client Ownership</h3>
              <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
                You retain complete, unrestricted ownership of your code, repository, domains, and cloud deployment pipelines. Zero vendor lock-in.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2D9C6] space-y-3">
              <Code2 className="w-6 h-6 text-[#3D9129]" />
              <h3 className="font-serif text-lg text-[#16130F]">Modern Tech Stack</h3>
              <p className="text-xs sm:text-sm text-[#5A554C] leading-relaxed">
                Next.js, TypeScript, Tailwind CSS, and Edge runtime APIs deliver the most resilient web infrastructure possible today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center w-full">
        <h2 className="font-serif text-3xl sm:text-5xl text-[#16130F] mb-6">
          Ready to build your next high-performance product?
        </h2>
        <p className="text-sm sm:text-base text-[#5A554C] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Tell us about your project targets, timeframe, and technical bottlenecks. We'll reply within 24 hours with an actionable plan.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-[#243629] hover:bg-[#1a281e] active:scale-95 transition-all shadow-md"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <Footer footer={landingData?.footer} navigation={landingData?.navigation} />
    </main>
  );
}
