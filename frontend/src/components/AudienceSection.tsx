import React from "react";
import { Stethoscope, Briefcase, ShoppingBag, Wrench, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AudienceSection() {
  const audiences = [
    {
      icon: Wrench,
      title: "Local service businesses",
      benefit: "Be found, look established, and make booking a call effortless.",
      metric: "Top Google Map Pack ranking & 1-tap call routing",
      tag: "Trades & Services",
    },
    {
      icon: Stethoscope,
      title: "Clinics and studios",
      benefit: "Clear services, online booking and a site patients trust.",
      metric: "Zero phone tag with direct schedule sync",
      tag: "Healthcare & Wellness",
    },
    {
      icon: ShoppingBag,
      title: "Shops and online stores",
      benefit: "A fast catalogue and checkout that keeps up with orders.",
      metric: "Sub-second filtering with headless Stripe payments",
      tag: "E-Commerce",
    },
    {
      icon: Briefcase,
      title: "Professional services",
      benefit: "Credibility, case studies and a steady flow of qualified enquiries.",
      metric: "High-trust editorial design that justifies premium rates",
      tag: "Advisory & B2B",
    },
  ];

  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {audiences.map((aud) => {
          const Icon = aud.icon;
          return (
            <div
              key={aud.title}
              className="rounded-[28px] bg-[#0F1A12]/80 border border-white/10 p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300 min-h-[320px] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#142318] border border-white/10 text-[#C8F169] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9BB3A2]">
                    {aud.tag}
                  </span>
                </div>

                <h3 className="text-[20px] font-semibold text-[#F4FDF6] leading-snug">
                  {aud.title}
                </h3>
                <p className="text-[14px] text-[#9BB3A2] mt-2.5 leading-relaxed">
                  {aud.benefit}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 text-[12px] font-mono text-[#C8F169] font-medium flex items-center justify-between">
                <span>{aud.metric}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
