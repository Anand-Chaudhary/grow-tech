"use client";

import React from "react";
import { ServiceGridItem, ServicesSectionData } from "@/lib/api";

export type { ServiceGridItem };

const DEFAULT_SERVICES: ServiceGridItem[] = [
  {
    number: "1",
    title: "Website design",
    description:
      "Foundational typography, layout systems, and bespoke responsive interfaces built to convert visitors into lifelong clients.",
    details: ["Typography & Hierarchy", "Wireframing & UI Prototypes", "Design Token Architecture"],
  },
  {
    number: "2",
    title: "Web development",
    description:
      "High performant web apps, interactive experiences, clean modern code with zero bloat and guaranteed sub-second load times.",
    details: ["Next.js & React 19", "Headless CMS & APIs", "Performance Engineering"],
  },
  {
    number: "3",
    title: "Deployment & launch",
    description:
      "Cloud hosting, domain configuration, automated edge CDNs, and complete SEO readiness with Schema.org verification.",
    details: ["Custom Domains & DNS", "Global Edge Cache", "Technical SEO Verification"],
  },
  {
    number: "4",
    title: "Mobile applications",
    description:
      "Intuitive mobile experiences and cross-platform applications engineered for buttery 60 FPS performance and offline reliability.",
    details: ["Responsive Viewports", "Progressive Web Apps", "Touch Gesture Precision"],
  },
];

interface WhatWeDoProps {
  services?: ServiceGridItem[];
  section?: ServicesSectionData;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({
  services,
  section,
}) => {
  const displayServices = services && services.length > 0 ? services : DEFAULT_SERVICES;
  const heading = section?.heading || "What we do.";

  return (
    <section id="services" className="w-full py-16 sm:py-24 border-t border-[#E2D9C6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#16130F] font-normal tracking-[-0.02em] mb-12 sm:mb-16">
          {heading}
        </h2>

        {/* 2x2 Grid with hairline borders matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#E2D9C6] rounded-xl overflow-hidden bg-white/40">
          {displayServices.map((item, idx) => (
            <div
              key={item.id || item.number || idx}
              className={`p-8 sm:p-12 flex flex-col justify-between transition-colors duration-200 hover:bg-white/80 ${
                idx % 2 === 0 ? "md:border-r border-[#E2D9C6]" : ""
              } ${idx < 2 ? "border-b border-[#E2D9C6]" : ""}`}
            >
              <div>
                {/* Large green numeral matching screenshot */}
                <span className="font-serif text-3xl sm:text-4xl text-[#3D9129] font-normal block mb-4">
                  {item.number}
                </span>

                {/* Service title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#16130F] font-normal mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-[15px] text-[#5A554C] leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>

              {/* Service tags / micro-details */}
              {item.details && item.details.length > 0 && (
                <div className="mt-8 pt-4 border-t border-[#E2D9C6]/40 flex flex-wrap gap-2">
                  {item.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-[11px] font-mono text-[#243629]/75 bg-[#EFE8D8]/50 px-2.5 py-0.5 rounded-full"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
