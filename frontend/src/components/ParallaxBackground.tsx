"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ParallaxBackground() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  // Parallax layers for subtle background elements
  const yOrb1 = useTransform(scrollY, [0, 3000], [0, 400]);
  const yOrb2 = useTransform(scrollY, [0, 3000], [0, -350]);

  // Smooth mouse spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 transition-transform duration-75 ease-out pointer-events-none"
        style={{
          background: "radial-gradient(circle, #C8F169 0%, #10B981 40%, transparent 70%)",
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
        }}
      />

      {/* Atmospheric Aurora Mesh Blooms */}
      <motion.div
        style={{ y: yOrb1 }}
        className="absolute -top-[200px] left-[20%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 bg-gradient-to-br from-[#C8F169] via-[#2E5A36] to-transparent pointer-events-none animate-pulse duration-[8000ms]"
      />
      <motion.div
        style={{ y: yOrb2 }}
        className="absolute top-[800px] right-[-100px] w-[650px] h-[650px] rounded-full blur-[170px] opacity-15 bg-gradient-to-bl from-[#10B981] via-[#142318] to-transparent pointer-events-none"
      />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 bg-[#C8F169] pointer-events-none" />

      {/* Minimalist Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
    </div>
  );
}
