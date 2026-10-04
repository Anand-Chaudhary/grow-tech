import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Check, Terminal, FileCode, Database, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { PROCESS_STEPS } from "@/data/content";

export const metadata = {
  title: "Engineering Process & Handover Protocol | Grow Tech",
  description:
    "From review to launch in 4 disciplined steps. Explore our 100% client account handover guarantee and zero vendor lock-in protocol.",
};

export default function ProcessPage() {
  const handoverItems = [
    {
      title: "Domain & DNS Records",
      desc: "Cloudflare or Namecheap registered in your company name. Zero proxy management or trapped credentials.",
      icon: Terminal,
    },
    {
      title: "Clean Git Codebase",
      desc: "Full production Next.js repository transferred directly to your organization GitHub or GitLab account.",
      icon: FileCode,
    },
    {
      title: "Edge Cloud Hosting",
      desc: "Vercel or AWS project deployed directly under your company team with zero markups or hosting surcharges.",
      icon: Cpu,
    },
    {
      title: "Database & CMS Content",
      desc: "Supabase, PostgreSQL, or Sanity CMS workspaces fully transferred with direct owner privileges.",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080E09] text-[#F4FDF6] flex flex-col selection:bg-[#C8F169] selection:text-[#080E09] relative overflow-hidden">
      <ParallaxBackground />
      <Navbar />

      <main className="flex-1 w-full pt-40 sm:pt-48 pb-28 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-[#C8F169] bg-[#C8F169]/10 px-4 py-1.5 rounded-full border border-[#C8F169]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C8F169] animate-pulse"></span>
            Engineering Blueprint · Disciplined Sprints
          </div>

          <h1 className="text-[44px] sm:text-[64px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.02]">
            How we take your site from concept to production.
          </h1>

          <p className="text-[19px] sm:text-[22px] text-[#9BB3A2] mt-6 leading-relaxed">
            No agency runarounds or multi-month delays. We operate on agile, transparent engineering sprints with defined deliverables at every phase.
          </p>
        </div>

        {/* 4 Steps Detailed Breakdown */}
        <div className="flex flex-col gap-10 mb-24">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-[32px] bg-[#0F1A12]/90 backdrop-blur-xl border border-[#C8F169]/20 p-8 sm:p-14 flex flex-col md:flex-row items-start justify-between gap-10 hover:border-[#C8F169]/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-[20px] bg-[#142318] border border-[#C8F169]/30 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[22px] shrink-0 shadow-[0_0_20px_rgba(200,241,105,0.15)]">
                  {step.step}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#F4FDF6] tracking-tight">
                      {step.title}
                    </h2>
                    <span className="font-mono text-[12px] text-[#C8F169] bg-[#C8F169]/10 border border-[#C8F169]/20 px-3.5 py-1 rounded-full font-semibold">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[17px] text-[#9BB3A2] mt-3 max-w-xl leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-[320px] rounded-[20px] bg-[#142318]/90 border border-[#C8F169]/20 p-6 shrink-0 shadow-lg">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#C8F169] mb-2">
                  Deliverable Handed Over:
                </div>
                <div className="text-[15px] font-medium text-[#F4FDF6] flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#C8F169] shrink-0" />
                  <span>{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The 100% Client Ownership Guarantee Checklist */}
        <div className="rounded-[32px] bg-[#0F1A12]/95 border border-[#C8F169]/30 p-8 sm:p-16 mb-24 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#C8F169]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl mb-12 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#C8F169]" />
              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-[#C8F169]">
                Zero Hostage Guarantee
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[44px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.08]">
              The 100% Client Ownership Protocol
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#9BB3A2] mt-3 leading-relaxed">
              When the site goes live, every single component sits in your accounts. If you ever leave Grow Tech, you leave with everything.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {handoverItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[24px] bg-[#142318]/80 border border-[#C8F169]/20 p-7 flex flex-col justify-between hover:border-[#C8F169]/50 transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#C8F169] flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(200,241,105,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-[19px] text-[#F4FDF6]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#9BB3A2] mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#C8F169]/15 font-mono text-[12px] text-[#C8F169] flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#C8F169]" /> 100% Transferred
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="p-10 sm:p-16 rounded-[32px] bg-[#142318] border border-[#C8F169]/30 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div>
            <h3 className="text-[28px] sm:text-[34px] font-semibold text-[#F4FDF6] tracking-tight">
              Ready to start with Step 01?
            </h3>
            <p className="text-[17px] text-[#9BB3A2] mt-2 leading-relaxed">
              Book a free 20-minute site review call. We look at your current site and discuss your growth objectives.
            </p>
          </div>
          <Link
            href="/review"
            className="btn-primary-leaf shrink-0 h-[56px] px-9 text-[16px] flex items-center gap-2"
          >
            <span>Book 20-min review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
