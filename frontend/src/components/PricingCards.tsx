"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Shield, Sparkles } from "lucide-react";
import { PRICING_PLANS } from "@/data/content";

export default function PricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Growth");

  return (
    <div className="w-full relative z-10">
      {/* 3 Spacious Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isHighlighted = plan.highlighted;

          return (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`rounded-[32px] p-8 sm:p-11 flex flex-col justify-between transition-all duration-300 relative cursor-pointer backdrop-blur-xl ${
                isHighlighted
                  ? "bg-[#111C13] text-[#F4FDF6] border-2 border-[#C8F169] shadow-[0_20px_50px_rgba(0,0,0,0.7)] lg:-translate-y-2 z-10"
                  : "bg-[#0F1A12]/80 text-[#F4FDF6] border border-white/10 hover:border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              }`}
            >
              {/* Highlight label */}
              {isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-[#C8F169] text-[#080E09] text-[11px] font-mono font-bold uppercase tracking-[0.14em] shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Flagship · Recommended</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="pb-6 border-b border-white/10">
                  <h3 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-[#F4FDF6]">
                    {plan.name}
                  </h3>
                  <p className="text-[14px] mt-1 text-[#9BB3A2]">
                    {plan.bestFor}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-7">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[48px] sm:text-[54px] font-bold tracking-tight font-mono text-[#C8F169]">
                      {plan.price}
                    </span>
                    <span className="text-[15px] text-[#9BB3A2]">
                      / {plan.cadence}
                    </span>
                  </div>
                  <p className="text-[15px] mt-2.5 leading-relaxed text-[#9BB3A2]">
                    {plan.description}
                  </p>
                </div>

                {/* Included Deliverables */}
                <div className="py-6 border-t border-white/10">
                  <div className="font-mono text-[11px] uppercase tracking-wider mb-4 text-[#C8F169] font-medium">
                    What is included:
                  </div>
                  <ul className="flex flex-col gap-3 text-[14px]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[#F4FDF6]">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#C8F169]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Big Outline Hover Button */}
              <div className="pt-8">
                <Link
                  href="/review"
                  className={`w-full h-[52px] rounded-full text-[15px] font-medium flex items-center justify-center gap-2 transition-all ${
                    isHighlighted
                      ? "btn-primary-leaf"
                      : "btn-secondary-outline"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-3 text-center text-[12px] text-[#9BB3A2]">
                  Fixed quote · 100% client account ownership
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
