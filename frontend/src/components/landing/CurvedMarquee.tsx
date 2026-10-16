"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

interface ShowcaseCard {
  id: string;
  tag: string;
  title: string;
  metric?: string;
  icon: React.ReactNode;
  variant: "analytics" | "store" | "system" | "mobile" | "editorial" | "cloud";
}

const CARDS: ShowcaseCard[] = [
  {
    id: "card-1",
    tag: "Next.js 15",
    title: "High Performance Web Apps",
    metric: "0.6s LCP",
    icon: <Zap className="w-3.5 h-3.5 text-[#3D9129]" />,
    variant: "analytics",
  },
  {
    id: "card-2",
    tag: "E-Commerce",
    title: "Headless Checkout Engine",
    metric: "99.98% Uptime",
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#F9AD1B]" />,
    variant: "store",
  },
  {
    id: "card-3",
    tag: "Design System",
    title: "Scalable Component Library",
    metric: "100+ Tokens",
    icon: <Layers className="w-3.5 h-3.5 text-[#243629]" />,
    variant: "system",
  },
  {
    id: "card-4",
    tag: "Mobile First",
    title: "Cross-Platform Precision",
    metric: "60 FPS Fluid",
    icon: <Smartphone className="w-3.5 h-3.5 text-[#3D9129]" />,
    variant: "mobile",
  },
  {
    id: "card-5",
    tag: "Cloud Native",
    title: "Global Edge & Domain CDN",
    metric: "Sub-15ms TTFB",
    icon: <Globe className="w-3.5 h-3.5 text-[#F9AD1B]" />,
    variant: "cloud",
  },
  {
    id: "card-6",
    tag: "SEO & Speed",
    title: "100/100 Lighthouse Benchmark",
    metric: "Rank #1 Ready",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-[#243629]" />,
    variant: "editorial",
  },
];

// Double cards list to ensure full panoramic track coverage
const TRACK_ITEMS = [...CARDS, ...CARDS];

export const CurvedMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let lastTime = performance.now();
    const speed = 0.055; // Smooth continuous marquee velocity

    const update = (now: number) => {
      const delta = Math.min(now - lastTime, 40);
      lastTime = now;

      if (!isPausedRef.current) {
        offsetRef.current += speed * delta;
      }

      const containerWidth = container.offsetWidth || 1200;
      const halfW = containerWidth / 2;
      const totalCards = TRACK_ITEMS.length;
      // Responsive spacing between card centers
      const cardSpacing = Math.max(containerWidth / 3.6, 290);
      const trackLength = totalCards * cardSpacing;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        // Position relative to center: [-trackLength/2, trackLength/2]
        let pos = (i * cardSpacing - offsetRef.current) % trackLength;
        if (pos < -trackLength / 2) pos += trackLength;
        if (pos > trackLength / 2) pos -= trackLength;

        // Normalized horizontal coordinate (-1.0 at left edge, 0 at center, +1.0 at right edge)
        const normX = pos / (halfW * 0.92);
        const absX = Math.abs(normX);

        /*
          TRUE 3D CONCAVE CYLINDER MATHEMATICS:
          1. rotateY: Cards face tangent to cylinder radius.
             Left cards angle inward towards center (+Y), right cards angle inward (-Y).
          2. translateZ: Center recedes deeply into the screen (-130px), ends flare forward (+25px).
          3. scale: Center is squeezed/farther (0.80), ends are wider/closer (1.08).
          4. translateY: Squeezed height arc following the ribbon envelope.
        */
        const rotY = -normX * 28; // in degrees
        const zDepth = (Math.min(1.4, absX) ** 1.8);
        const transZ = -135 + zDepth * 160; // in px
        const scale = 0.80 + (Math.min(1.3, absX) ** 1.6) * 0.28;
        const transY = (1 - Math.min(1, normX * normX)) * -12;

        // Smooth fade out at the viewport extremes
        let opacity = 1;
        if (absX > 1.2) {
          opacity = Math.max(0, 1 - (absX - 1.2) * 3.5);
        }

        // Apply hardware-accelerated 3D transform directly on the DOM element
        el.style.transform = `translate3d(${pos}px, ${transY}px, ${transZ}px) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${Math.round(zDepth * 20)}`;
      });

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-2 sm:py-6 select-none">
      {/*
        SVG ClipPath Definition for the 3D concave cylindrical curve:
        Squeezed in the middle (dips down to y: 0.20 and rises from bottom to y: 0.80).
        Wider at the ends (y: 0.02 to y: 0.98).
      */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="hero-3d-curve" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.02 Q 0.5,0.20 1,0.02 L 1,0.98 Q 0.5,0.80 0,0.98 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        className="w-full relative mx-auto h-[310px] sm:h-[350px] md:h-[380px]"
        style={{
          perspective: "1100px",
          perspectiveOrigin: "50% 50%",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/*
          Curved Envelope Viewport
          Using the defined SVG clip-path to produce the squeezed-in-between ribbon shape
        */}
        <div
          className="w-full h-full relative"
          style={{
            clipPath: "url(#hero-3d-curve)",
            WebkitClipPath: "url(#hero-3d-curve)",
            transformStyle: "preserve-3d",
          }}
        >
          {/*
            Concave 3D lighting:
            Edges are brighter/closer, center is subtly recessed in depth.
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#DCD7CB]/85 via-[#EDE9DD]/45 to-[#DCD7CB]/85 pointer-events-none" />

          {/* Cards positioned along the 3D circular cylinder arc */}
          {TRACK_ITEMS.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[290px] md:w-[320px] h-[225px] sm:h-[245px] md:h-[265px] bg-[#D8D4C8] hover:bg-[#D0CCC0] rounded-xl sm:rounded-2xl border border-white/60 p-4 sm:p-5 flex flex-col justify-between shadow-lg cursor-pointer overflow-hidden transition-colors will-change-transform"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Subtle 3D cylindrical surface sheen */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-black/5 pointer-events-none" />

              {/* Mockup browser window header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-2 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
                </div>
                <div className="flex items-center gap-1 bg-white/50 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wide text-[#2E3A1B]/70">
                  {card.icon}
                  <span>{card.tag}</span>
                </div>
              </div>

              {/* Card Content Area - Minimalist Digital Product UI */}
              <div className="flex-1 flex flex-col justify-center py-2 relative z-10">
                {card.variant === "analytics" && (
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-medium text-[#5A554C]">Performance Index</span>
                      <span className="text-[12px] font-bold text-[#3D9129]">{card.metric}</span>
                    </div>
                    <div className="w-full bg-white/60 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#3D9129] h-full w-[94%] rounded-full" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      <div className="bg-white/40 p-1.5 rounded text-center text-[9px] text-[#5A554C]">
                        FCP <strong>0.3s</strong>
                      </div>
                      <div className="bg-white/40 p-1.5 rounded text-center text-[9px] text-[#5A554C]">
                        CLS <strong>0.00</strong>
                      </div>
                      <div className="bg-white/40 p-1.5 rounded text-center text-[9px] text-[#5A554C]">
                        FID <strong>12ms</strong>
                      </div>
                    </div>
                  </div>
                )}

                {card.variant === "store" && (
                  <div className="space-y-2 bg-white/40 p-2.5 rounded-lg border border-black/5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#243629]">Order Conversion</span>
                      <span className="text-[#F9AD1B] font-bold">+38.4%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-[#243629]/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#3D9129]" />
                      </div>
                      <div className="text-[10px] text-[#5A554C] leading-tight">
                        <div className="font-medium text-[#243629]">Instant Checkout</div>
                        <div>Stripe & Apple Pay active</div>
                      </div>
                    </div>
                  </div>
                )}

                {card.variant === "system" && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-medium text-[#5A554C]">Design Hierarchy</div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#243629] text-white text-[10px] rounded-md font-serif">
                        Serif H1
                      </span>
                      <span className="px-2 py-0.5 bg-white/70 text-[#243629] text-[10px] rounded-md font-sans font-semibold">
                        Sans 600
                      </span>
                      <span className="px-2 py-0.5 bg-[#F9AD1B] text-white text-[10px] rounded-md">
                        Accent
                      </span>
                    </div>
                    <div className="flex items-center gap-1 pt-1">
                      <div className="w-4 h-4 rounded-full bg-[#FAF6EC] border border-[#E2D9C6]" />
                      <div className="w-4 h-4 rounded-full bg-[#243629]" />
                      <div className="w-4 h-4 rounded-full bg-[#3D9129]" />
                      <div className="w-4 h-4 rounded-full bg-[#F9AD1B]" />
                      <div className="w-4 h-4 rounded-full bg-[#EFE8D8]" />
                    </div>
                  </div>
                )}

                {card.variant === "mobile" && (
                  <div className="flex items-center justify-around bg-white/40 py-2 rounded-lg">
                    <div className="text-center">
                      <div className="text-[13px] font-bold text-[#243629]">100%</div>
                      <div className="text-[9px] text-[#5A554C]">Responsive</div>
                    </div>
                    <div className="h-6 w-[1px] bg-black/10" />
                    <div className="text-center">
                      <div className="text-[13px] font-bold text-[#3D9129]">Touch</div>
                      <div className="text-[9px] text-[#5A554C]">Optimized</div>
                    </div>
                  </div>
                )}

                {card.variant === "cloud" && (
                  <div className="space-y-1.5 bg-white/40 p-2 rounded-lg">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#5A554C]">Edge Nodes</span>
                      <span className="text-[#3D9129] font-semibold">Healthy</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-1.5 flex-1 bg-[#3D9129] rounded-full" />
                      <div className="h-1.5 flex-1 bg-[#3D9129] rounded-full" />
                      <div className="h-1.5 flex-1 bg-[#3D9129] rounded-full" />
                      <div className="h-1.5 flex-1 bg-[#3D9129] rounded-full" />
                    </div>
                    <div className="text-[9px] text-[#5A554C] font-mono">
                      Global SSL · 0s Downtime
                    </div>
                  </div>
                )}

                {card.variant === "editorial" && (
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-[#243629] font-serif leading-tight">
                      Editorial Craftsmanship
                    </div>
                    <p className="text-[9.5px] text-[#5A554C] line-clamp-2 leading-relaxed">
                      Precision typography, whitespace hierarchy, and balanced proportion.
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="border-t border-black/5 pt-2 flex items-center justify-between relative z-10">
                <span className="text-[12px] font-semibold text-[#243629] truncate max-w-[170px]">
                  {card.title}
                </span>
                <span className="text-[10px] font-bold text-[#3D9129] bg-white/60 px-1.5 py-0.5 rounded">
                  {card.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge gradient masks for seamless end-to-end fading */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF6EC] to-transparent z-20" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF6EC] to-transparent z-20" />
    </div>
  );
};
