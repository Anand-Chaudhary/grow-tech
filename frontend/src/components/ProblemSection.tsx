"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function ProblemSection() {
  const [activeTab, setActiveTab] = useState<"slow" | "leak" | "stuck">("slow");

  const problems = [
    {
      id: "slow" as const,
      number: "01",
      title: "It's slow where it counts.",
      tagline: "Visitors on phones leave before they see your offer.",
      description:
        "Standard WordPress templates and heavy DIY site builders download 4 to 8 MB of JavaScript before rendering text. On 4G mobile connections, 53% of mobile visitors abandon pages that take more than 3 seconds to load.",
      beforeHeadline: "What DIY builders & typical agencies give you",
      beforePoints: [
        "5.8s average mobile load time with render-blocking plugins",
        "Scores 38/100 on Google PageSpeed Insights",
        "Over half of paid ad traffic bounces before first interaction",
      ],
      afterHeadline: "How Grow Tech engineers your site",
      afterPoints: [
        "Sub-second LCP (0.8s) on mobile 4G networks",
        "Strict 100/100 Lighthouse performance budget",
        "Zero bloat: only static semantic HTML and lightweight hydration",
      ],
    },
    {
      id: "leak" as const,
      number: "02",
      title: "Enquiries leak.",
      tagline: "The next step is unclear, the form is buried, and nothing is tracked.",
      description:
        "Visitors glance at your page, get confused by generic jargon or broken contact modals, and navigate away to your competitors. Without clear conversion hierarchy and telemetry, you never know where leads are lost.",
      beforeHeadline: "What DIY builders & typical agencies give you",
      beforePoints: [
        "10-field generic contact forms that kill conversions",
        "Buried CTAs with zero visual contrast or clear next steps",
        "Unmeasured traffic: no tracking of where prospective leads drop off",
      ],
      afterHeadline: "How Grow Tech engineers your site",
      afterPoints: [
        "4-field frictionless lead capture designed for mobile completion",
        "One primary conversion goal reinforced across every section",
        "Direct routing to Cal.com, Calendly, or your CRM with automated alerts",
      ],
    },
    {
      id: "stuck" as const,
      number: "03",
      title: "You're stuck.",
      tagline: "The person who built it holds the logins, and every small change takes a week.",
      description:
        "Agencies love retainers and proprietary hosting lock-ins. You shouldn't have to submit a support ticket and wait five business days just to update your pricing, add a team member, or post a case study.",
      beforeHeadline: "What DIY builders & typical agencies give you",
      beforePoints: [
        "Hostage credentials: domain and code held in the agency's private accounts",
        "Mandatory monthly retainers just to keep plugins from breaking",
        "Days of delay for basic copy or image updates",
      ],
      afterHeadline: "How Grow Tech engineers your site",
      afterPoints: [
        "100% Client Ownership: Domain, GitHub repo, and Vercel host in your name",
        "Intuitive self-serve CMS for instant zero-code updates",
        "Zero vendor lock-in: if you ever leave, you take your entire codebase with you",
      ],
    },
  ];

  const current = problems.find((p) => p.id === activeTab)!;

  return (
    <div className="w-full relative z-10">
      {/* 3 Spacious Clean Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {problems.map((p) => {
          const isSelected = activeTab === p.id;

          return (
            <motion.div
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              whileHover={{ y: -4 }}
              className={`rounded-[28px] p-8 sm:p-10 border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${
                isSelected
                  ? "bg-[#111C13] border-[#C8F169] shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
                  : "bg-[#0F1A12]/80 border-white/10 hover:border-white/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <span className="font-mono text-[16px] font-bold text-[#C8F169]">
                    {p.number}
                  </span>
                  <span className="font-mono text-[11px] text-[#9BB3A2] uppercase tracking-wider">
                    {isSelected ? "Active View" : "Click to Inspect"}
                  </span>
                </div>

                <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#F4FDF6] mt-5 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[14px] font-medium text-[#C8F169] mt-2">
                  {p.tagline}
                </p>
                <p className="text-[14.5px] text-[#9BB3A2] mt-3.5 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[13px] font-medium">
                <span className="text-[#F4FDF6]">Compare Architecture</span>
                <span className="flex items-center gap-1.5 text-[#C8F169]">
                  <span>{isSelected ? "Selected" : "Inspect"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Spacious Before / After Comparison Inspector */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-10 rounded-[28px] bg-[#0F1A12]/90 border border-white/10 p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-[#C8F169]" />
          <h4 className="text-[22px] sm:text-[28px] font-semibold text-[#F4FDF6] tracking-tight">
            Direct Architecture Breakdown: {current.title}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Legacy Agencies */}
          <div className="rounded-[22px] bg-[#142318]/70 border border-red-500/20 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-400 font-semibold text-[15px] mb-4">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{current.beforeHeadline}</span>
              </div>
              <ul className="flex flex-col gap-3 text-[14px] text-[#9BB3A2] leading-relaxed">
                {current.beforePoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">—</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grow Tech */}
          <div className="rounded-[22px] bg-[#142318]/90 border border-[#C8F169]/30 p-7 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-[#C8F169] font-semibold text-[15px] mb-4">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C8F169]" />
                <span>{current.afterHeadline}</span>
              </div>
              <ul className="flex flex-col gap-3 text-[14px] text-[#F4FDF6] leading-relaxed font-medium">
                {current.afterPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <span className="text-[#C8F169] font-bold shrink-0 mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
