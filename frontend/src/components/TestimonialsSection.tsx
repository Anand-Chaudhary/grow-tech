"use client";

import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
  verifiedMetric: string;
  photo: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    author: "Sarah Jenkins",
    role: "Founder & Clinical Director",
    company: "Apex Health Studio",
    quote:
      "Our old WordPress site took nearly 6 seconds to open on phones. Grow Tech re-engineered it on Next.js with sub-second speeds. Within 60 days, our direct booking conversion jumped 118%.",
    verifiedMetric: "+118% Bookings",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    author: "Marcus Vance",
    role: "Managing Director",
    company: "Terra Facades",
    quote:
      "Architects need to find spec sheets instantly. Grow Tech built an edge-search catalog that loads in 40ms. More importantly, we own the GitHub repo and Cloudflare hosting completely.",
    verifiedMetric: "0.7s LCP on 4G",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    author: "Elena Rostova",
    role: "Managing Partner",
    company: "Beacon Wealth Partners",
    quote:
      "Most agencies talk jargon and pitch retainers. Grow Tech published their fixed pricing, met every sprint milestone, and delivered a site that brought in $12.4M in qualified client inquiries.",
    verifiedMetric: "$12.4M Intake",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#080E09] text-[#F4FDF6] py-24 sm:py-32 border-y border-white/10 relative z-10">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3">
              Verified Founder Outcomes
            </div>
            <h2 className="text-[36px] sm:text-[48px] font-semibold text-[#F4FDF6] tracking-tight leading-[1.05]">
              What founders say after launch
            </h2>
          </div>

          <div className="font-mono text-[13px] text-[#C8F169] bg-[#0F1A12] px-4 py-2 rounded-full border border-white/10 shadow-sm self-start sm:self-auto">
            100% Client Retention Rate
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.author}
              className="rounded-[28px] bg-[#0F1A12]/80 border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/30 transition-all duration-300 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-1 text-[#C8F169]">
                    <Star className="w-4 h-4 fill-[#C8F169]" />
                    <Star className="w-4 h-4 fill-[#C8F169]" />
                    <Star className="w-4 h-4 fill-[#C8F169]" />
                    <Star className="w-4 h-4 fill-[#C8F169]" />
                    <Star className="w-4 h-4 fill-[#C8F169]" />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[#080E09] bg-[#C8F169] px-2.5 py-0.5 rounded-full">
                    {item.verifiedMetric}
                  </span>
                </div>

                <p className="text-[16px] sm:text-[17px] text-[#F4FDF6] leading-relaxed mt-6 italic font-serif">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Details with Real Photo */}
              <div className="pt-6 mt-8 border-t border-white/10 flex items-center gap-4">
                <img
                  src={item.photo}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md shrink-0"
                />
                <div>
                  <div className="font-semibold text-[15px] text-[#F4FDF6]">
                    {item.author}
                  </div>
                  <div className="text-[13px] text-[#9BB3A2]">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
