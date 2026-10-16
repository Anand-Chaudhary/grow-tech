"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import logo from '@/assets/logo.svg'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 sm:py-16 border-t border-[#E2D9C6]/80 bg-[#FAF6EC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#E2D9C6]/60">
          {/* Logo at bottom left as in screenshot */}
          <Link href="/" className="inline-block">
            <Image src={logo} alt="Logo" width={150} height={150} priority />
          </Link>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-[13px] text-[#5A554C]">
            <Link href="#hero" className="hover:text-[#243629] transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-[#243629] transition-colors">
              About
            </Link>
            <Link href="#services" className="hover:text-[#243629] transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="hover:text-[#243629] transition-colors">
              Portfolio
            </Link>
            <Link href="#contact" className="hover:text-[#243629] transition-colors">
              Contact
            </Link>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-[#5A554C] hover:text-[#243629] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A554C]/80">
          <div>
            © {new Date().getFullYear()} Grow Tech. Websites and apps built to grow with your business.
          </div>
          <div className="flex items-center gap-4">
            <span>Client-owned code & domains</span>
            <span>·</span>
            <span>Zero lock-in</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
