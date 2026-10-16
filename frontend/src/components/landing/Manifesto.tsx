"use client";

import React from "react";
import { ManifestoData } from "@/lib/api";

interface ManifestoProps {
  manifesto?: ManifestoData;
}

export const Manifesto: React.FC<ManifestoProps> = ({ manifesto }) => {
  const heading =
    manifesto?.heading ||
    "We solve problems with design and technology, and stay close while it grows.";
  const highlight = manifesto?.highlight || "and stay close while it grows.";
  const paragraphs = manifesto?.paragraphs || [
    "Full-spectrum execution from understanding whatever hurdles your digital product faces to custom design and engineering that scales effortlessly as your audience expands.",
    "You remain completely in control throughout our discovery, architecture, and ongoing updates. Every repository, domain, and asset sits in accounts you own from day one.",
  ];

  return (
    <section id="about" className="w-full py-20 sm:py-28 border-t border-[#E2D9C6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Big Statement matching screenshot */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] leading-[1.12] text-[#16130F] font-normal tracking-[-0.02em]">
              {heading.includes(highlight) ? (
                <>
                  {heading.split(highlight)[0]}
                  <span className="text-[#3D9129] block">
                    {highlight}
                  </span>
                </>
              ) : (
                heading
              )}
            </h2>
          </div>

          {/* Right Column: Dynamic paragraphs matching screenshot */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-[#5A554C] text-[15px] sm:text-[16px] leading-relaxed pt-2">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
