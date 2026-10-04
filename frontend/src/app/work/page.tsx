import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeTicker from "@/components/MarqueeTicker";
import { CASE_STUDIES } from "@/data/content";

export const metadata = {
  title: "Client Case Studies & Verified Results | Grow Tech",
  description:
    "Measured outcomes over vague claims. See how we helped healthcare clinics, architectural distributors, and wealth managers increase inquiries by up to 118%.",
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#080E09] text-[#F4FDF6] flex flex-col selection:bg-[#C8F169] selection:text-[#080E09] relative">
      <Navbar />

      <main className="flex-1 w-full pt-40 sm:pt-48 pb-28 px-6 sm:px-10 max-w-[1200px] mx-auto relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-20 text-center sm:text-left">
          <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-[#C8F169] mb-4">
            Evidence &amp; Case Studies
          </div>

          <h1 className="text-[44px] sm:text-[64px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.02]">
            Real clients. Real numbers. Measurable growth.
          </h1>

          <p className="text-[19px] sm:text-[22px] text-[#9BB3A2] mt-6 leading-relaxed">
            Every case study below represents real production software engineered by Grow Tech. We measure speed in Google Search Console and conversion directly in our clients&apos; revenue channels.
          </p>
        </div>

        {/* Case Studies Deep Dive List */}
        <div className="flex flex-col gap-16">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="rounded-[32px] bg-[#0F1A12]/90 border border-[#C8F169]/25 p-8 sm:p-14 scroll-mt-28 flex flex-col lg:flex-row justify-between gap-12 hover-lift backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 pb-4">
                    <span className="font-mono text-[14px] font-semibold text-[#C8F169]">
                      {study.client}
                    </span>
                    <span className="text-[#9BB3A2] text-[13px]">/</span>
                    <span className="font-mono text-[12px] text-[#9BB3A2] uppercase tracking-wider">
                      {study.industry} · Completed {study.year}
                    </span>
                  </div>

                  <h2 className="text-[30px] sm:text-[38px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.12]">
                    {study.headline}
                  </h2>

                  <div className="mt-8 flex flex-col gap-5 text-[16px] text-[#9BB3A2]">
                    <div>
                      <strong className="text-[#F4FDF6] font-semibold block mb-1">
                        The Challenge:
                      </strong>
                      <p className="leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <strong className="text-[#F4FDF6] font-semibold block mb-1">
                        What Grow Tech Engineered:
                      </strong>
                      <p className="leading-relaxed">{study.whatWeBuilt}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#142318] border border-[#C8F169]/30 text-[#F4FDF6] font-medium flex items-start gap-3 mt-2 shadow-[0_0_20px_rgba(200,241,105,0.1)]">
                      <TrendingUp className="w-5 h-5 shrink-0 mt-0.5 text-[#C8F169]" />
                      <div>
                        <strong className="text-[#C8F169] block">Verified Business Outcome:</strong>
                        <p className="text-[15px] mt-1 leading-relaxed">{study.result}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-[#C8F169]/15 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[12px] px-3.5 py-1 rounded-full bg-[#142318] border border-[#C8F169]/30 text-[#C8F169]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/review"
                    className="btn-primary-leaf h-[50px] px-7 text-[15px] flex items-center gap-2"
                  >
                    <span>Request similar architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Verified Metrics Dashboard Panel */}
              <div className="lg:w-[340px] rounded-[24px] bg-[#142318] border border-[#C8F169]/30 p-8 flex flex-col justify-between shrink-0 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                <div>
                  <div className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169] pb-4 border-b border-[#C8F169]/15">
                    Performance Audit
                  </div>

                  <div className="py-8 flex flex-col gap-6">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="font-mono font-bold text-[36px] text-[#C8F169] leading-none">
                          {m.value}
                        </span>
                        <span className="text-[14px] text-[#9BB3A2] mt-1 font-medium">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C8F169]/15 flex items-center gap-2 text-[13px] text-[#9BB3A2]">
                  <ShieldCheck className="w-4 h-4 text-[#C8F169]" />
                  <span>Telemetry logged via GA4 &amp; GSC</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to action banner */}
        <div className="mt-20 p-10 sm:p-16 rounded-[32px] bg-[#142318] text-[#F4FDF6] border border-[#C8F169]/30 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div>
            <h3 className="text-[28px] sm:text-[34px] font-semibold text-[#FAF6EC] tracking-tight">
              Ready for your site to become your best case study?
            </h3>
            <p className="text-[16px] text-[#C9D1C3] mt-2 leading-relaxed">
              Book a 20-minute diagnostic review. We&apos;ll evaluate your current traffic bottlenecks for free.
            </p>
          </div>
          <Link
            href="/review"
            className="btn-primary-leaf shrink-0 h-[56px] px-9 text-[16px] flex items-center gap-2"
          >
            <span>Book free site review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
