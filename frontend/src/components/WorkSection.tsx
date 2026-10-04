"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "@/data/content";

const CASE_STUDY_IMAGES: Record<string, string> = {
  apex: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
  terra: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  beacon: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
};

export default function WorkSection() {
  return (
    <div className="w-full flex flex-col gap-10 relative z-10">
      {CASE_STUDIES.map((study) => {
        const image = CASE_STUDY_IMAGES[study.id] || CASE_STUDY_IMAGES.apex;

        return (
          <div
            key={study.id}
            className="rounded-[32px] overflow-hidden bg-[#0F1A12]/80 border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Visual Preview */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
                <img
                  src={image}
                  alt={study.client}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A12] via-[#0F1A12]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0F1A12]" />

                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080E09]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#C8F169]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8F169] animate-pulse" />
                  <span>{study.client}</span>
                </div>
              </div>

              {/* Right Narrative & Outcomes */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-3">
                    <span className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169]">
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="text-[26px] sm:text-[32px] font-semibold text-[#F4FDF6] tracking-tight leading-tight">
                    {study.headline}
                  </h3>

                  <div className="mt-6 space-y-4 text-[15px] text-[#9BB3A2]">
                    <div>
                      <span className="text-[#F4FDF6] font-semibold block text-[13px] font-mono uppercase tracking-wider mb-1">
                        Challenge:
                      </span>
                      <p className="leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <span className="text-[#F4FDF6] font-semibold block text-[13px] font-mono uppercase tracking-wider mb-1">
                        Architecture Built:
                      </span>
                      <p className="leading-relaxed">{study.whatWeBuilt}</p>
                    </div>
                  </div>

                  {/* Measured Outcome Banner */}
                  <div className="my-6 p-4 rounded-2xl bg-[#142318]/90 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-[#C8F169] shrink-0" />
                      <span className="text-[14px] text-[#F4FDF6] font-medium">Measured Outcome:</span>
                    </div>
                    <span className="font-mono text-[15px] font-bold text-[#C8F169]">
                      {study.result}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#142318] border border-white/10 text-[#9BB3A2]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work#${study.id}`}
                    className="btn-secondary-outline h-[46px] px-6 text-[14px] flex items-center gap-2"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
