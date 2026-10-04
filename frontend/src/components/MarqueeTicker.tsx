import React from "react";

interface MarqueeProps {
  reverse?: boolean;
  theme?: "emerald" | "deep" | "lime";
  items?: string[];
}

export default function MarqueeTicker({
  reverse = false,
  theme = "deep",
  items = [
    "SUB-SECOND MOBILE LCP",
    "100/100 LIGHTHOUSE CI",
    "100% CLIENT-OWNED REPO",
    "ZERO VENDOR LOCK-IN",
    "NEXT.JS & TYPESCRIPT ARCHITECTURE",
    "TRANSPARENT PRICING FROM $2,400",
    "CYBERNETIC LUXURY CRAFT",
    "CONVERSION PATHWAY ENGINEERING",
    "PROVEN MEASURED OUTCOMES",
  ],
}: MarqueeProps) {
  const bgClass =
    theme === "lime"
      ? "bg-[#C8F169] text-[#080E09] border-[#C8F169]"
      : theme === "emerald"
      ? "bg-[#142318] text-[#F4FDF6] border-[#C8F169]/20"
      : "bg-[#080E09] text-[#F4FDF6] border-[#C8F169]/15";

  const dotColor = theme === "lime" ? "text-[#080E09]" : "text-[#C8F169]";

  return (
    <div
      className={`w-full overflow-hidden py-5 border-y ${bgClass} select-none relative z-10`}
    >
      <div className="marquee-container">
        <div className={reverse ? "animate-marquee-reverse" : "animate-marquee"}>
          {items.map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="font-mono text-[13px] sm:text-[14px] uppercase tracking-[0.18em] font-medium">
                {item}
              </span>
              <span className={`text-[12px] ${dotColor}`}>✦</span>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
        >
          {items.map((item, idx) => (
            <div key={`dup-${item}-${idx}`} className="flex items-center gap-6 whitespace-nowrap">
              <span className="font-mono text-[13px] sm:text-[14px] uppercase tracking-[0.18em] font-medium">
                {item}
              </span>
              <span className={`text-[12px] ${dotColor}`}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
