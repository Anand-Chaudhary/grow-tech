"use client";

import React from "react";
import Link from "next/link";
import { CurvedMarquee } from "./CurvedMarquee";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="w-full pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Hero Headline matching the design exactly */}
        <h1 className="font-serif text-[42px] sm:text-[62px] md:text-[76px] lg:text-[86px] leading-[1.08] tracking-[-0.03em] text-[#16130F] max-w-4xl mx-auto mb-6 sm:mb-10 font-normal">
          Websites and apps <br className="hidden sm:inline" />
          that are{" "}
          <span className="text-[#3D9129] font-normal inline-block">
            built to grow
          </span>{" "}
          with your <br className="hidden sm:inline" />
          business.
        </h1>
      </div>

      {/* 3D-ish Curve Marquee Section (Moving end-to-end as requested) */}
      <div className="w-full my-2 sm:my-4">
        <CurvedMarquee />
      </div>

      {/* Bottom Features & Action Row matching the screenshot */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Indicator Column: Dark Circle + Label */}
          <div className="md:col-span-3 flex flex-col items-start md:items-start text-left">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#243629] inline-block shadow-sm" />
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#243629] font-semibold">
                Social
              </span>
            </div>
            <p className="mt-2 text-xs text-[#5A554C] leading-relaxed hidden md:block">
              Connected experiences that resonate across social channels and convert.
            </p>
          </div>

          {/* Center Column: Outline Circle + Copy + Dual CTA Buttons */}
          <div className="md:col-span-6 flex flex-col items-center text-center px-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#243629] bg-transparent inline-block" />
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#243629] font-semibold">
                Scale
              </span>
            </div>

            <p className="text-[13.5px] sm:text-[14.5px] text-[#5A554C] leading-relaxed max-w-md mb-6 font-normal">
              Omnis enim voluptatem, omnis voluptas assumenda est omnis dolor repellendus 
              temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe.
            </p>

            {/* Two Action Buttons matching screenshot */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#243629] hover:bg-[#1a281e] active:scale-95 transition-all shadow-sm"
              >
                Start a project
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#16130F] bg-transparent border border-[#16130F]/80 hover:bg-[#EFE8D8]/70 active:scale-95 transition-all"
              >
                Explore our work
              </Link>
            </div>
          </div>

          {/* Right Indicator Column: Orange Circle + Label */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#243629] font-semibold">
                Launch
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#F9AD1B] inline-block shadow-sm" />
            </div>
            <p className="mt-2 text-xs text-[#5A554C] leading-relaxed hidden md:block">
              Rapid zero-friction deployment with guaranteed sub-second delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
