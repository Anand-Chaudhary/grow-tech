import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ParallaxBackground from "@/components/ParallaxBackground";

export const metadata = {
  title: "Book a Free 20-Minute Site Review | Grow Tech",
  description:
    "Get an actionable, engineer-led teardown of your small business website. 20 minutes, no sales pitch decks, you leave with a prioritised checklist.",
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[#080E09] text-[#F4FDF6] flex flex-col selection:bg-[#C8F169] selection:text-[#080E09] relative overflow-hidden">
      <ParallaxBackground />
      <Navbar />

      <main className="flex-1 w-full pt-40 sm:pt-48 pb-28 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10">
        {/* Page Intro */}
        <div className="max-w-3xl mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-[#C8F169] bg-[#C8F169]/10 px-4 py-1.5 rounded-full border border-[#C8F169]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C8F169] animate-pulse"></span>
            Free Technical Teardown
          </div>

          <h1 className="text-[44px] sm:text-[64px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.02]">
            Book a free 20-minute site review.
          </h1>

          <p className="text-[19px] sm:text-[22px] text-[#9BB3A2] mt-6 leading-relaxed">
            No sales decks. No junior reps reading a script. We audit your site&apos;s speed, mobile layout, and enquiry friction, then give you an honest list of fixes you can take to any developer.
          </p>
        </div>

        {/* The 4-Field Form Container */}
        <div className="mb-24">
          <ContactForm />
        </div>

        {/* What Happens On The Call Grid */}
        <div className="rounded-[32px] bg-[#0F1A12]/95 border border-[#C8F169]/30 p-8 sm:p-16 mb-20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="max-w-xl mb-10">
            <h2 className="text-[28px] sm:text-[36px] font-semibold text-[#F4FDF6] tracking-tight">
              What we examine during your 20 minutes
            </h2>
            <p className="text-[16px] text-[#9BB3A2] mt-2">
              Actionable engineering clarity, ordered by direct business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-[24px] bg-[#142318]/90 border border-[#C8F169]/20 p-8 flex flex-col justify-between hover:border-[#C8F169]/50 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[16px] mb-6 shadow-[0_0_15px_rgba(200,241,105,0.15)]">
                  01
                </div>
                <h3 className="font-semibold text-[20px] text-[#F4FDF6]">
                  Mobile Speed Audit
                </h3>
                <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                  We run throttled 4G lab tests to reveal render-blocking scripts, uncompressed images, and Core Web Vitals bottlenecks.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#142318]/90 border border-[#C8F169]/20 p-8 flex flex-col justify-between hover:border-[#C8F169]/50 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[16px] mb-6 shadow-[0_0_15px_rgba(200,241,105,0.15)]">
                  02
                </div>
                <h3 className="font-semibold text-[20px] text-[#F4FDF6]">
                  Enquiry Flow Teardown
                </h3>
                <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                  We trace the path from landing on your homepage to submitting a lead or booking a call, highlighting where prospective clients drop off.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#142318]/90 border border-[#C8F169]/20 p-8 flex flex-col justify-between hover:border-[#C8F169]/50 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#C8F169] flex items-center justify-center font-mono font-bold text-[16px] mb-6 shadow-[0_0_15px_rgba(200,241,105,0.15)]">
                  03
                </div>
                <h3 className="font-semibold text-[20px] text-[#F4FDF6]">
                  Prioritised Action Plan
                </h3>
                <p className="text-[15px] text-[#9BB3A2] mt-3 leading-relaxed">
                  You leave with a clear checklist of high-impact fixes ordered by ROI, whether you hire Grow Tech to implement them or not.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-8 sm:p-10 rounded-[28px] bg-[#142318] text-[#F4FDF6] border border-[#C8F169]/30 flex items-center gap-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <ShieldCheck className="w-8 h-8 text-[#C8F169] shrink-0" />
          <p className="text-[15px] sm:text-[16px] text-[#9BB3A2] leading-relaxed">
            <strong className="text-[#C8F169]">Zero High-Pressure Sales:</strong> If our packages aren&apos;t the right fit for your budget or stage of business, we&apos;ll tell you honestly and suggest alternative options.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
