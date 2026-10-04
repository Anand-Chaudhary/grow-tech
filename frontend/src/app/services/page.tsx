import React from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeTicker from "@/components/MarqueeTicker";
import { SERVICES } from "@/data/content";

export const metadata = {
  title: "Services & Engineering Deliverables | Grow Tech",
  description:
    "Explore our web development capabilities: high-converting business websites, headless e-commerce, custom booking systems, and continuous care plans.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#080E09] text-[#F4FDF6] flex flex-col selection:bg-[#C8F169] selection:text-[#080E09] relative">
      <Navbar />

      <main className="flex-1 w-full pt-40 sm:pt-48 pb-28 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-20 text-center sm:text-left">
          <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-[#C8F169] mb-4">
            Engineering &amp; Deliverables
          </div>

          <h1 className="text-[44px] sm:text-[64px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.02]">
            Built like products. Engineered to convert.
          </h1>

          <p className="text-[19px] sm:text-[22px] text-[#9BB3A2] mt-6 leading-relaxed">
            We don&apos;t install generic templates or sell bloated page counts. Every website is built on Next.js, tailored to your sales funnel, and handed over with 100% client account ownership.
          </p>
        </div>

        {/* Deep Dive Services List */}
        <div className="flex flex-col gap-16">
          {SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              id={srv.id}
              className="rounded-[32px] border border-[#C8F169]/20 bg-[#0F1A12]/90 backdrop-blur-xl p-8 sm:p-14 scroll-mt-28 text-[#F4FDF6] hover:border-[#C8F169]/50 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Description */}
                <div className="lg:col-span-6 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[16px] font-bold text-[#C8F169]">
                      0{idx + 1}
                    </span>
                    <span className="text-[#9BB3A2]/40">/</span>
                    <span className="font-mono text-[13px] uppercase tracking-wider text-[#C8F169] bg-[#C8F169]/10 px-3 py-1 rounded-full border border-[#C8F169]/20">
                      {srv.metricBadge}
                    </span>
                  </div>

                  <h2 className="text-[32px] sm:text-[42px] font-semibold tracking-tight leading-[1.08] text-[#F4FDF6]">
                    {srv.title}
                  </h2>

                  <p className="text-[18px] leading-relaxed text-[#9BB3A2]">
                    {srv.fullDesc}
                  </p>

                  <div className="pt-6 mt-4 border-t border-[#C8F169]/15">
                    <Link
                      href="/review"
                      className="btn-primary-leaf h-[54px] px-8 text-[15px] flex items-center gap-2 inline-flex"
                    >
                      <span>Inquire about {srv.title.toLowerCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Deliverables & Features Box */}
                <div className="lg:col-span-6 rounded-[24px] bg-[#080E09] text-[#F4FDF6] border border-[#C8F169]/30 p-8 sm:p-10 shadow-lg">
                  <div className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169] pb-4 border-b border-[#C8F169]/15">
                    Included Specifications &amp; Handover
                  </div>

                  <div className="py-6 flex flex-col gap-4">
                    <div className="font-semibold text-[16px] text-[#F4FDF6]">
                      Key Architecture Features:
                    </div>
                    <ul className="flex flex-col gap-2.5 text-[15px] text-[#9BB3A2]">
                      {srv.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-[#C8F169] shrink-0 mt-1" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="font-semibold text-[16px] text-[#F4FDF6] pt-4 mt-2 border-t border-[#C8F169]/15">
                      Tangible Deliverables at Handover:
                    </div>
                    <ul className="flex flex-col gap-2.5 text-[15px] text-[#9BB3A2]">
                      {srv.deliverables.map((deliv) => (
                        <li key={deliv} className="flex items-start gap-3">
                          <ShieldCheck className="w-4 h-4 text-[#C8F169] shrink-0 mt-1" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-10 sm:p-16 rounded-[32px] bg-[#142318] border border-[#C8F169]/30 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div>
            <h3 className="text-[28px] sm:text-[34px] font-semibold text-[#F4FDF6] tracking-tight">
              Unsure which architecture fits your business?
            </h3>
            <p className="text-[17px] text-[#9BB3A2] mt-2 leading-relaxed">
              Book a free 20-minute site review. We analyze your requirements and provide an honest recommendation.
            </p>
          </div>
          <Link
            href="/review"
            className="btn-primary-leaf shrink-0 h-[56px] px-9 text-[16px] flex items-center gap-2"
          >
            <span>Book free review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
