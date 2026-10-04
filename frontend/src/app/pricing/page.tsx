import React from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, X, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCards from "@/components/PricingCards";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "Published Website Pricing & Scope | Grow Tech",
  description:
    "Transparent web development pricing: Launch starting at $2,400, Growth starting at $4,800. Written scopes, client-owned code, zero surprise invoices.",
};

export default function PricingPage() {
  const comparisonFeatures = [
    { name: "Custom Page Count", launch: "Up to 5 pages", growth: "10 to 15 pages", scale: "Custom architecture" },
    { name: "Target Mobile LCP", launch: "< 1.2s", growth: "< 0.8s", scale: "< 0.6s (Edge CDN)" },
    { name: "Editorial Design System", launch: "Yes", growth: "Yes + Custom Components", scale: "Enterprise Design System" },
    { name: "SEO & Schema.org Setup", launch: "Foundational", growth: "Advanced + Blog CMS", scale: "Full Ingestion Pipeline" },
    { name: "Content Management (CMS)", launch: "Optional Add-on", growth: "Included (Sanity/Supabase)", scale: "Headless Multi-locale" },
    { name: "Direct CRM / Booking Sync", launch: "Standard Forms", growth: "Cal.com & HubSpot Sync", scale: "Bespoke Database & Webhooks" },
    { name: "Post-Launch Warranty", launch: "14 days", growth: "30 days priority", scale: "SLA Dedicated Engineer" },
    { name: "100% Client Account Ownership", launch: "Yes", growth: "Yes", scale: "Yes" },
  ];

  return (
    <div className="min-h-screen bg-[#080E09] text-[#F4FDF6] flex flex-col selection:bg-[#C8F169] selection:text-[#080E09] relative">
      <Navbar />

      <main className="flex-1 w-full pt-40 sm:pt-48 pb-28 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-20 text-center sm:text-left">
          <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-[#C8F169] mb-4">
            Published In The Open · Zero Surprises
          </div>

          <h1 className="text-[44px] sm:text-[64px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.02]">
            Clear packages. Real prices. Zero surprises.
          </h1>

          <p className="text-[19px] sm:text-[22px] text-[#9BB3A2] mt-6 leading-relaxed">
            Most agencies hide their prices so they can bill whatever they think you can afford. We publish starting rates and write exact deliverables before signing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mb-24">
          <PricingCards />
        </div>

        {/* Detailed Comparison Table */}
        <div className="rounded-[32px] bg-[#0F1A12]/90 border border-[#C8F169]/25 p-8 sm:p-14 mb-24 overflow-x-auto backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="mb-8">
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#F4FDF6] tracking-tight">
              Feature &amp; Deliverable Matrix
            </h2>
            <p className="text-[16px] text-[#9BB3A2] mt-1.5">
              Every deliverable is written in plain English inside your proposal before any invoice is sent.
            </p>
          </div>

          <table className="w-full text-left text-[15px] border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#C8F169]/15 text-[12px] font-mono uppercase tracking-wider text-[#C8F169]">
                <th className="py-4 pr-6 font-semibold">Deliverable</th>
                <th className="py-4 px-6 font-semibold">Launch ($2,400)</th>
                <th className="py-4 px-6 font-semibold text-[#C8F169]">Growth ($4,800)</th>
                <th className="py-4 pl-6 font-semibold">Scale (Custom)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8F169]/10">
              {comparisonFeatures.map((row) => (
                <tr key={row.name} className="hover:bg-[#142318]/50 transition-colors">
                  <td className="py-4 pr-6 font-medium text-[#F4FDF6]">{row.name}</td>
                  <td className="py-4 px-6 text-[#9BB3A2]">{row.launch}</td>
                  <td className="py-4 px-6 font-semibold text-[#C8F169] bg-[#C8F169]/5">{row.growth}</td>
                  <td className="py-4 pl-6 text-[#9BB3A2]">{row.scale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* The 3-Year Total Cost of Ownership Truth */}
        <div className="rounded-[32px] bg-[#0F1A12]/90 border border-[#C8F169]/25 p-8 sm:p-14 mb-24 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-2xl mb-8">
            <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#C8F169] mb-2">
              Market Reality Check
            </div>
            <h3 className="text-[26px] sm:text-[32px] font-semibold text-[#F4FDF6] tracking-tight">
              Why &ldquo;Cheap&rdquo; Builders Often Cost More Over 3 Years
            </h3>
            <p className="text-[16px] text-[#9BB3A2] mt-2.5 leading-relaxed">
              When factoring in lost sales from poor mobile speed, premium plugin subscriptions, and emergency developer fixes, template builders frequently cost small businesses tens of thousands in uncaptured revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-[#C8F169]/15">
            <div className="p-7 rounded-[24px] bg-[#142318] border border-[#C8F169]/20">
              <div className="font-semibold text-[18px] text-[#F4FDF6]">DIY Site Builders</div>
              <div className="text-[14px] text-[#9BB3A2] mt-2 leading-relaxed">
                $30-$80/mo in subscription fees + $150/mo in third-party plugins. High mobile abandonment costs an estimated $10,000-$30,000 in lost client enquiries annually.
              </div>
            </div>

            <div className="p-7 rounded-[24px] bg-[#142318] border border-[#C8F169]/20">
              <div className="font-semibold text-[18px] text-[#F4FDF6]">Typical Retainer Agency</div>
              <div className="text-[14px] text-[#9BB3A2] mt-2 leading-relaxed">
                $5,000-$15,000 upfront + mandatory $500/mo maintenance retainers. They hold your hosting accounts and charge $150/hr for minor copy changes.
              </div>
            </div>

            <div className="p-7 rounded-[24px] bg-[#16261A] border border-[#C8F169]/40 shadow-[0_0_25px_rgba(200,241,105,0.15)]">
              <div className="font-semibold text-[18px] text-[#C8F169]">Grow Tech Approach</div>
              <div className="text-[14px] text-[#F4FDF6] mt-2 leading-relaxed">
                Fixed one-time starting price from $2,400. You own 100% of accounts. Sub-second speed captures leads from day one. Optional care plan with zero lock-in.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-[32px] sm:text-[42px] font-semibold text-[#F4FDF6] tracking-tight">
              Frequently Asked Pricing Questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </main>

      <Footer />
    </div>
  );
}
