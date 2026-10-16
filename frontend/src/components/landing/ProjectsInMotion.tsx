"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/lib/api";

export type { ProjectItem };

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "project-1",
    number: "01",
    category: "WEBSITE DEVELOPMENT",
    title: "Project 1",
    client: "Aethel BioTech",
    description:
      "High-performance digital presence and product catalogue with sub-second loading and custom editorial layout.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "CMS Integration"],
    metrics: "100/100 Lighthouse · 0.5s LCP",
    accentBg: "#243629",
  },
  {
    id: "project-2",
    number: "02",
    category: "WEBSITE DEVELOPMENT",
    title: "Project 2",
    client: "Komorebi Design Lab",
    description:
      "Architectural portfolio and client onboarding portal featuring fluid animations and headless commerce checkouts.",
    tags: ["React 19", "Framer Motion", "Stripe API", "Cloudflare Edge"],
    metrics: "+42% Enquiries · 99.99% Uptime",
    accentBg: "#1F2E22",
  },
];

interface ProjectsInMotionProps {
  projects?: ProjectItem[];
  badge?: string;
  heading?: string;
}

export const ProjectsInMotion: React.FC<ProjectsInMotionProps> = ({
  projects,
  badge = "Oct 2024",
  heading = "Projects in motion.",
}) => {
  const displayProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <section id="portfolio" className="w-full py-16 sm:py-24 border-t border-[#E2D9C6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#5A554C] block mb-2 font-medium">
            {badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#16130F] font-normal tracking-[-0.02em]">
            {heading}
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {displayProjects.map((project, idx) => (
            <div
              key={project.id || idx}
              className={`group flex flex-col rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                idx === 1 ? "md:mt-12" : ""
              }`}
            >
              {/* Upper Section: Olive Green Mockup Canvas */}
              <div
                className="w-full aspect-[4/3] sm:aspect-[1.15/1] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: project.accentBg || "#243629" }}
              >
                {/* Subtle ambient gradient & decorative elements */}
                <div className="absolute inset-0 bg-radial from-white/[0.08] to-transparent pointer-events-none" />

                {/* Top browser bar inside mockup */}
                <div className="flex items-center justify-between text-white/50 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-white/60">
                    {project.client}
                  </span>
                </div>

                {/* Center visual: sleek minimalist digital interface */}
                <div className="my-auto z-10 w-full max-w-sm mx-auto bg-black/25 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-[#F9AD1B]">
                      {project.number} / LIVE CASE
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      Production
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/20 rounded w-3/4" />
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-4/5" />
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                    <span>Performance Budget</span>
                    <span className="text-emerald-400 font-mono font-bold">100/100</span>
                  </div>
                </div>

                {/* Bottom badge */}
                <div className="flex items-center justify-between text-xs text-white/60 z-10">
                  <span className="font-mono">{project.metrics}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#243629] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Lower Section: Warm Cream Banner matching screenshot */}
              <div className="w-full bg-[#FAF4E6] p-6 sm:p-7 border border-[#E2D9C6]/60 border-t-0 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                <div className="text-[11px] font-mono tracking-[0.14em] uppercase text-[#5A554C] font-semibold mb-1">
                  {project.number} {project.category}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#16130F] font-normal">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-[#5A554C] leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono bg-white/80 border border-[#E2D9C6] text-[#243629] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
