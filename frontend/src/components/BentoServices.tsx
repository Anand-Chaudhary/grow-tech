"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, ShoppingCart, Calendar, Activity, Check, ShieldCheck, Sparkles } from "lucide-react";

export default function BentoServices() {
  return (
    <div className="w-full relative z-10">
      {/* 12-Column Spacious Bento Grid matching Reference Image 1 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Row 1, 8 columns: Business Websites with Real Imagery */}
        <div className="lg:col-span-8 rounded-[32px] overflow-hidden border border-white/10 bg-[#0F1A12]/90 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Engineering team collaboration"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A12] via-[#0F1A12]/60 to-transparent" />

            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080E09]/80 backdrop-blur-md border border-white/15 text-[12px] font-mono text-[#C8F169]">
              <Zap className="w-3.5 h-3.5" />
              <span>Core Next.js 16 Architecture</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169]">
                High-Conversion Web Products
              </span>
              <h3 className="text-[28px] sm:text-[38px] font-semibold text-[#F4FDF6] tracking-tight leading-tight mt-1">
                Business websites that turn traffic into pipeline.
              </h3>
            </div>
          </div>

          <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
            <p className="text-[17px] sm:text-[18px] text-[#9BB3A2] leading-relaxed">
              We design and engineer bespoke web platforms for scaling companies. No slow WordPress themes or generic drag-and-drop page builders. Every page is hand-coded in React, styled with precision, and optimized for mobile conversion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-8">
              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[22px] font-bold text-[#C8F169]">0.8s</div>
                <div className="text-[14px] font-medium text-[#F4FDF6] mt-1">Mobile LCP Speed</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Top 1% web speed worldwide.</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[22px] font-bold text-[#C8F169]">100%</div>
                <div className="text-[14px] font-medium text-[#F4FDF6] mt-1">Client Repo Ownership</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Deployed to your Cloudflare/GitHub.</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[22px] font-bold text-[#C8F169]">14 Days</div>
                <div className="text-[14px] font-medium text-[#F4FDF6] mt-1">Concept to Production</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Strict sprint timelines guaranteed.</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[14px] text-[#9BB3A2]">
                Includes Figma UI kit, clean TypeScript repo, and full DNS handover.
              </span>
              <Link
                href="/services#business-websites"
                className="btn-secondary-outline h-[48px] px-7 text-[14px] flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <span>Explore Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Row 1, 4 columns: Online Stores with Product Visual */}
        <div className="lg:col-span-4 rounded-[32px] overflow-hidden border border-white/10 bg-[#0F1A12]/90 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <div className="relative h-[220px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
              alt="Headless commerce storefront"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A12] via-[#0F1A12]/60 to-transparent" />

            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080E09]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#C8F169]">
              <ShoppingCart className="w-3 h-3" />
              <span>Headless Commerce</span>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-[26px] sm:text-[30px] font-semibold text-[#F4FDF6] tracking-tight leading-tight">
                Online stores without template lag.
              </h3>
              <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                Headless Shopify and Stripe billing architectures engineered for instant catalog filtering and 0.7s cart checkouts.
              </p>
            </div>

            <div className="my-6 space-y-2.5">
              <div className="text-[14px] text-[#F4FDF6] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                <span>Instant-filter search (&lt;50ms response)</span>
              </div>
              <div className="text-[14px] text-[#F4FDF6] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                <span>Stripe 1-click Apple Pay & Google Pay</span>
              </div>
              <div className="text-[14px] text-[#F4FDF6] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                <span>Automated inventory sync</span>
              </div>
            </div>

            <Link
              href="/services#online-stores"
              className="btn-primary-leaf w-full h-[50px] px-6 text-[14px] flex items-center justify-center gap-2"
            >
              <span>Commerce Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Row 2, 4 columns: Booking & Intake Pipelines */}
        <div className="lg:col-span-4 rounded-[32px] overflow-hidden border border-white/10 bg-[#0F1A12]/90 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <div className="relative h-[220px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
              alt="Medical and professional intake"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A12] via-[#0F1A12]/60 to-transparent" />

            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080E09]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#C8F169]">
              <Calendar className="w-3 h-3" />
              <span>Intake & Booking</span>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-[26px] sm:text-[30px] font-semibold text-[#F4FDF6] tracking-tight leading-tight">
                Booking systems that stop lead leakage.
              </h3>
              <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                Connect your website directly to your calendar, CRM, and automated notification channels with zero friction.
              </p>
            </div>

            <div className="my-6 space-y-2.5">
              <div className="text-[14px] text-[#F4FDF6] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                <span>Cal.com & Calendly real-time two-way sync</span>
              </div>
              <div className="text-[14px] text-[#F4FDF6] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                <span>HubSpot, Notion & CRM ingestion</span>
              </div>
              <div className="text-[14px] text-[#F4FDF6] flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                <span>Cloudflare Turnstile spam protection</span>
              </div>
            </div>

            <Link
              href="/services#booking-lead-systems"
              className="btn-primary-leaf w-full h-[50px] px-6 text-[14px] flex items-center justify-center gap-2"
            >
              <span>Booking Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Row 2, 8 columns: Care & Growth Plans */}
        <div className="lg:col-span-8 rounded-[32px] overflow-hidden border border-white/10 bg-[#0F1A12]/90 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142318] border border-white/10 text-[11px] font-mono text-[#C8F169]">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Continuous Care & Growth</span>
                </div>
                <span className="font-mono text-[12px] text-[#C8F169] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C8F169] animate-pulse" />
                  Zero Lock-In Retainers
                </span>
              </div>

              <h3 className="text-[28px] sm:text-[38px] font-semibold text-[#F4FDF6] tracking-tight leading-tight">
                Dedicated engineering care that protects your investment.
              </h3>

              <p className="text-[17px] text-[#9BB3A2] mt-4 max-w-2xl leading-relaxed">
                We monitor your Core Web Vitals 24/7, perform ongoing security audits, and provide monthly developer hours for copy changes, new landing pages, and conversion experiments.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#9BB3A2]">LCP Target</div>
                <div className="font-mono text-[26px] font-bold text-[#C8F169] mt-1">&lt;0.8s</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Mobile guaranteed</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#9BB3A2]">Uptime</div>
                <div className="font-mono text-[26px] font-bold text-[#C8F169] mt-1">99.99%</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Edge CDN failover</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#9BB3A2]">Shift Rate</div>
                <div className="font-mono text-[26px] font-bold text-[#C8F169] mt-1">0.00</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Zero layout drift</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#142318]/90 border border-white/5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#9BB3A2]">Monthly Time</div>
                <div className="font-mono text-[26px] font-bold text-[#C8F169] mt-1">4-12h</div>
                <div className="text-[12px] text-[#9BB3A2] mt-0.5">Senior dev sprints</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[14px] text-[#9BB3A2]">
                Monthly automated reports, error logging, and priority turnaround.
              </span>
              <Link
                href="/services#care-growth-plans"
                className="btn-primary-leaf h-[48px] px-7 text-[14px] flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <span>View Care Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
