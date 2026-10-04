import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Check } from "lucide-react";
import { PROCESS_STEPS } from "@/data/content";

export default function ProcessSection() {
  return (
    <div className="w-full relative z-10">
      {/* 4 Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.step}
            className="rounded-[28px] bg-[#0F1A12]/80 border border-white/10 p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300 min-h-[350px] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <span className="font-mono text-[16px] font-bold text-[#C8F169]">
                  {step.step}
                </span>
                <span className="font-mono text-[11px] text-[#C8F169] font-medium bg-[#C8F169]/10 border border-[#C8F169]/20 px-3 py-1 rounded-full">
                  {step.duration}
                </span>
              </div>

              <h3 className="text-[20px] font-semibold text-[#F4FDF6] mt-5 tracking-tight">
                {step.title}
              </h3>

              <p className="text-[14px] text-[#9BB3A2] leading-relaxed mt-2.5">
                {step.desc}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#9BB3A2] mb-1.5">
                Deliverable:
              </div>
              <div className="text-[13px] font-medium text-[#F4FDF6] flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C8F169] shrink-0 mt-0.5" />
                <span>{step.deliverable}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline note */}
      <div className="mt-8 p-6 sm:p-8 rounded-[24px] bg-[#0F1A12]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[14px] text-[#9BB3A2] shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-[#C8F169] shrink-0" />
          <span>
            <strong className="text-[#F4FDF6]">Typical Timeline:</strong> 2 to 4 weeks from review to live deployment. Having your copy outline ready is the biggest factor.
          </span>
        </div>
        <Link
          href="/process"
          className="font-medium text-[#C8F169] hover:underline flex items-center gap-1.5 shrink-0"
        >
          View engineering blueprint <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
