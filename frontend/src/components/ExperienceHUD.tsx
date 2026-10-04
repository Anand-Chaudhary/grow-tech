"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Sparkles, ChevronUp, Layers, Check } from "lucide-react";

interface SectionInfo {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionInfo[] = [
  { id: "hero", num: "01", name: "Overview" },
  { id: "curved-preview", num: "02", name: "Showcase" },
  { id: "problem", num: "03", name: "The Bottleneck" },
  { id: "services", num: "04", name: "Deliverables" },
  { id: "simulator", num: "05", name: "Speed ROI" },
  { id: "pricing", num: "06", name: "Pricing" },
  { id: "process", num: "07", name: "Handover" },
];

export default function ExperienceHUD() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("01");
  const [activeTitle, setActiveTitle] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      setIsVisible(window.scrollY > 150);

      // Section detection
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].num);
          setActiveTitle(SECTIONS[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 sm:right-10 z-40 select-none">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-64 rounded-2xl bg-[#0F1A12]/95 backdrop-blur-xl border border-white/10 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#C8F169] px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
              <span>Story Navigation</span>
              <span className="text-[#9BB3A2]">{Math.round(scrollProgress)}%</span>
            </div>

            <div className="py-1 flex flex-col gap-0.5">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.num;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      const el = document.getElementById(sec.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                      setMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-mono transition-colors text-left ${
                      isActive
                        ? "bg-[#C8F169]/15 text-[#C8F169] font-semibold"
                        : "text-[#9BB3A2] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="opacity-50">{sec.num}</span>
                      <span>{sec.name}</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#C8F169]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 mt-1">
              <Link
                href="/review"
                onClick={() => setMenuOpen(false)}
                className="w-full h-9 rounded-xl bg-[#C8F169] text-[#080E09] font-semibold text-[12px] flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
              >
                <span>Free 20-min Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill HUD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-[#0F1A12]/90 backdrop-blur-xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer hover:border-[#C8F169]/50 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {/* Circular Progress Ring */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-8 h-8 transform -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={81.68}
              strokeDashoffset={81.68 - (81.68 * scrollProgress) / 100}
              className="text-[#C8F169] transition-all duration-150"
            />
          </svg>
          <span className="absolute font-mono text-[9px] font-bold text-[#F4FDF6]">
            {activeSection}
          </span>
        </div>

        <div className="flex flex-col text-left pl-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8F169] leading-none">
            Chapter
          </span>
          <span className="text-[12px] font-medium text-[#F4FDF6] leading-tight">
            {activeTitle}
          </span>
        </div>

        <div className="ml-2 pl-2 border-l border-white/15">
          <ChevronUp
            className={`w-4 h-4 text-[#9BB3A2] transition-transform duration-200 ${
              menuOpen ? "rotate-180 text-[#C8F169]" : ""
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
}
