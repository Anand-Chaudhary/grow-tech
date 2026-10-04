import React from "react";
import { TECH_STACK } from "@/data/content";

export default function TechStackSection() {
  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="rounded-[24px] bg-[#0F1A12]/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-300 min-h-[190px] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#C8F169]">
                  {tech.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8F169]" />
              </div>
              <h4 className="text-[19px] font-semibold text-[#F4FDF6] mt-4">
                {tech.name}
              </h4>
              <p className="text-[14px] text-[#9BB3A2] mt-2 leading-relaxed">
                {tech.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
