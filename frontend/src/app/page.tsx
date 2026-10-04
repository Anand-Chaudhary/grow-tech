"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import ExperienceHUD from "@/components/ExperienceHUD";
import CurvedGallery from "@/components/CurvedGallery";
import BentoServices from "@/components/BentoServices";
import ProblemSection from "@/components/ProblemSection";
import AudienceSection from "@/components/AudienceSection";
import WorkSection from "@/components/WorkSection";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/TechStackSection";
import PricingCards from "@/components/PricingCards";
import ScorecardSimulator from "@/components/ScorecardSimulator";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import MarqueeTicker from "@/components/MarqueeTicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080E09] text-[#F4FDF6] flex flex-col selection:bg-[#C8F169] selection:text-[#080E09] relative">
      {/* Luxury Ambient Aurora & Interactive Cursor Spotlight */}
      <ParallaxBackground />

      {/* Interactive Story Progression & Chapter HUD */}
      <ExperienceHUD />

      <Navbar />

      <main className="flex-1 w-full overflow-hidden relative z-10">
        {/* =========================================================================
            SECTION: HERO (Flowblox Editorial Luxury Aesthetic)
           ========================================================================= */}
        <section id="hero" className="pt-36 sm:pt-44 pb-16 sm:pb-24 px-6 sm:px-10 max-w-[1240px] mx-auto text-center relative z-10">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111A13]/90 border border-white/10 text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-8 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8F169] animate-pulse" />
            <span>Next.js 16 Web Engineering for Scaling Businesses</span>
          </motion.div>

          {/* Two-Line Headline: Editorial Serif + Bold Modern Sans */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-center justify-center text-center tracking-tight"
          >
            <span
              className="font-serif italic font-normal text-[50px] sm:text-[72px] md:text-[88px] lg:text-[104px] leading-[1.0] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F4FDF6] to-[#C8F169]/90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Websites that scale with you,
            </span>
            <span className="font-semibold text-[52px] sm:text-[74px] md:text-[92px] lg:text-[110px] leading-[1.0] text-[#F4FDF6] mt-2 sm:mt-3">
              when your business grows.
            </span>
          </motion.h1>

          {/* Subhead with generous breathing room */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-[19px] sm:text-[22px] text-[#9BB3A2] max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Grow Tech designs and builds sub-second, custom websites for small businesses on the rise. Clear prices, 100% client code ownership, and zero agency runaround.
          </motion.p>

          {/* Large Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link
              href="/review"
              className="btn-primary-leaf w-full sm:w-auto h-[56px] px-9 text-[16px] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Book a free site review</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#pricing"
              className="btn-secondary-outline w-full sm:w-auto h-[56px] px-9 text-[16px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View published packages</span>
              <ChevronRight className="w-4 h-4 text-current" />
            </Link>
          </motion.div>

          {/* Microcopy Guarantee */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-[14px] text-[#9BB3A2] flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#C8F169]" />
            <span>20 minutes. No pitch deck. You leave with an actionable technical audit.</span>
          </motion.p>

          {/* Flowblox 3D Curved Perspective Panoramic Gallery */}
          <motion.div
            id="curved-preview"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-14 sm:mt-16"
          >
            <CurvedGallery />
          </motion.div>
        </section>

        {/* =========================================================================
            MARQUEE TICKER 1: Brand Capabilities & Engineering Highlights
           ========================================================================= */}
        <MarqueeTicker
          theme="deep"
          items={[
            "SUB-SECOND MOBILE LCP",
            "100/100 LIGHTHOUSE CI",
            "100% CLIENT-OWNED REPO",
            "ZERO VENDOR LOCK-IN",
            "NEXT.JS 16 & TYPESCRIPT",
            "TRANSPARENT PRICING FROM $2,400",
            "CONVERSION PATHWAY ARCHITECTURE",
            "DIRECT EDGE HOSTING",
          ]}
        />

        {/* =========================================================================
            SECTION: PROBLEM (Interactive Architecture Breakdown)
           ========================================================================= */}
        <section id="problem" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10 border-t border-white/10">
          <div className="max-w-2xl mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>The Growth Bottleneck</span>
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              Your business grew. Your website didn&apos;t.
            </h2>
            <p className="text-[18px] sm:text-[20px] text-[#9BB3A2] mt-4 leading-relaxed">
              When a slow template or freelancer build begins to stall your customer inquiries, you don&apos;t need another redesign pitch. You need an engineering upgrade.
            </p>
          </div>

          <ProblemSection />
        </section>

        {/* =========================================================================
            SECTION: WHAT WE BUILD (Spacious Bento Services with Real Visuals)
           ========================================================================= */}
        <section id="services" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1240px] mx-auto border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Core Engineering Capabilities</span>
              </div>
              <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
                Everything your site needs to carry a growing business
              </h2>
            </div>
            <Link
              href="/services"
              className="btn-secondary-outline h-[50px] px-8 text-[15px] flex items-center gap-2 self-start md:self-auto shrink-0"
            >
              <span>Explore all deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <BentoServices />
        </section>

        {/* =========================================================================
            SECTION: WHY GROW TECH (The 3 Core Pillars)
           ========================================================================= */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Radical Transparency
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              A web company that holds its work to the standard
            </h2>
            <p className="text-[17px] text-[#9BB3A2] mt-4 leading-relaxed">
              Proof beats adjectives. Every claim we make sits next to its real verified artifact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-[28px] bg-[#0F1A12]/80 border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/30 backdrop-blur-xl transition-all shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#142318] border border-white/10 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[20px] mb-6">
                  01
                </div>
                <h3 className="text-[24px] font-semibold text-[#F4FDF6] tracking-tight">
                  Built like a product
                </h3>
                <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                  Every page has a strict performance budget and is audited before launch. We run continuous Lighthouse CI to guarantee zero speed degradation.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[13px] font-mono text-[#C8F169] font-medium">
                Verified: 0.8s LCP / 34ms INP
              </div>
            </div>

            <div className="rounded-[28px] bg-[#0F1A12]/80 border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/30 backdrop-blur-xl transition-all shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#142318] border border-white/10 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[20px] mb-6">
                  02
                </div>
                <h3 className="text-[24px] font-semibold text-[#F4FDF6] tracking-tight">
                  Priced in the open
                </h3>
                <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                  Packages and starting prices are published directly below. Detailed scope, deliverables, and timelines are written down before work begins.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[13px] font-mono text-[#C8F169] font-medium">
                Starting from $2,400 · Fixed Quote
              </div>
            </div>

            <div className="rounded-[28px] bg-[#142318]/90 border border-white/15 p-8 sm:p-10 flex flex-col justify-between hover:border-[#C8F169]/40 backdrop-blur-xl transition-all shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#080E09] border border-[#C8F169]/40 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[20px] mb-6 shadow-sm">
                  03
                </div>
                <h3 className="text-[24px] font-semibold text-[#F4FDF6] tracking-tight">
                  Yours, completely
                </h3>
                <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                  Domain, hosting, repository and content live in accounts you own. If you ever decide to leave, you leave with everything. Zero hostages.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-[13px] font-mono text-[#C8F169] font-semibold">
                100% Client Handover Guarantee
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: WHO IT'S FOR
           ========================================================================= */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <div className="max-w-2xl mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Specialized Focus
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              Built for businesses that are growing
            </h2>
            <p className="text-[17px] text-[#9BB3A2] mt-3 leading-relaxed">
              We specialize in small businesses where their website is a direct revenue engine, not just a passive brochure.
            </p>
          </div>

          <AudienceSection />
        </section>

        {/* =========================================================================
            SECTION: RECENT WORK
           ========================================================================= */}
        <section id="work" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
                Evidence Over Claims
              </div>
              <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
                Recent client launches &amp; measured results
              </h2>
            </div>
            <Link
              href="/work"
              className="btn-secondary-outline h-[50px] px-8 text-[15px] flex items-center gap-2 self-start md:self-auto shrink-0"
            >
              <span>View full case studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <WorkSection />
        </section>

        {/* =========================================================================
            MARQUEE TICKER 2: Reverse Technology & Tools Ticker
           ========================================================================= */}
        <MarqueeTicker
          reverse
          theme="lime"
          items={[
            "NEXT.JS SERVER COMPONENTS",
            "TAILWIND CSS ARCHITECTURE",
            "STRIPE PAYMENTS",
            "SUPABASE POSTGRESQL",
            "SANITY HEADLESS CMS",
            "VERCEL EDGE NETWORK",
            "CAL.COM INTEGRATIONS",
            "HUBSPOT CRM PIPELINES",
          ]}
        />

        {/* =========================================================================
            SECTION: PROCESS
           ========================================================================= */}
        <section id="process" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10 border-t border-white/10">
          <div className="max-w-2xl mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Clear Engineering Method
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              From first call to launch in four steps
            </h2>
            <p className="text-[17px] text-[#9BB3A2] mt-3 leading-relaxed">
              No endless revision limbo or surprise milestones. A disciplined engineering schedule you can plan around.
            </p>
          </div>

          <ProcessSection />
        </section>

        {/* =========================================================================
            SECTION: TECH & INTEGRATIONS
           ========================================================================= */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <div className="max-w-2xl mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Ecosystem &amp; Stack
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              Built on modern tools, connected to the ones you already use
            </h2>
            <p className="text-[17px] text-[#9BB3A2] mt-3 leading-relaxed">
              We build on Next.js and connect your site directly to the payment, database, CRM, and analytics tools your company runs on.
            </p>
          </div>

          <TechStackSection />
        </section>

        {/* =========================================================================
            SECTION: PACKAGES & PRICING
           ========================================================================= */}
        <section id="pricing" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Published In The Open
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              Clear packages. Real prices.
            </h2>
            <p className="text-[17px] text-[#9BB3A2] mt-4 leading-relaxed">
              Prices published upfront. Fixed quote after your free review. Zero surprise invoices.
            </p>
          </div>

          <PricingCards />
        </section>

        {/* =========================================================================
            SECTION: SCORECARD & PERFORMANCE TELEMETRY
           ========================================================================= */}
        <section id="simulator" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <ScorecardSimulator />
        </section>

        {/* =========================================================================
            SECTION: TESTIMONIALS
           ========================================================================= */}
        <TestimonialsSection />

        {/* =========================================================================
            SECTION: FAQ
           ========================================================================= */}
        <section id="faq" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Direct Answers
            </div>
            <h2 className="text-[38px] sm:text-[50px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              Questions owners ask before they hire us
            </h2>
            <p className="text-[17px] text-[#9BB3A2] mt-3 leading-relaxed">
              Honest answers on cost, speed, platform choices, and long-term ownership.
            </p>
          </div>

          <FaqAccordion />
        </section>

        {/* =========================================================================
            SECTION: FINAL CONVERSION
           ========================================================================= */}
        <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1200px] mx-auto border-t border-white/10 relative z-10">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
