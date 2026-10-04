"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/content";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 relative z-10">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.question}
            className={`rounded-[24px] border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
              isOpen
                ? "bg-[#142318] border-[#C8F169] shadow-[0_10px_30px_rgba(200,241,105,0.15)]"
                : "bg-[#0F1A12]/80 border-[#C8F169]/20 hover:border-[#C8F169]/40"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-5 cursor-pointer select-none"
            >
              <span className="font-semibold text-[18px] sm:text-[20px] text-[#F4FDF6] leading-snug">
                {faq.question}
              </span>
              <span
                className={`w-9 h-9 rounded-full border border-[#C8F169]/30 flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? "bg-[#C8F169] text-[#080E09]" : "bg-[#080E09] text-[#C8F169]"
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 sm:px-7 pb-7 pt-1 text-[16px] text-[#9BB3A2] leading-relaxed border-t border-[#C8F169]/15 animate-in fade-in duration-200">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
