"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { FooterData, NavigationData } from "@/lib/api";
import logo from '@/assets/logo.svg'

interface FooterProps {
  footer?: FooterData;
  navigation?: NavigationData;
}

export const Footer: React.FC<FooterProps> = ({ footer, navigation }) => {
  const valueProps = footer?.valueProps || ["Client-owned code & domains", "Zero lock-in"];
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
              {navigation?.home || "Home"}
            </Link>
            <Link href="#about" className="hover:text-[#243629] transition-colors">
              {navigation?.about || "About"}
            </Link>
            <Link href="#services" className="hover:text-[#243629] transition-colors">
              {navigation?.services || "Services"}
            </Link>
            <Link href="#portfolio" className="hover:text-[#243629] transition-colors">
              {navigation?.portfolio || "Portfolio"}
            </Link>
            <Link href="#contact" className="hover:text-[#243629] transition-colors">
              {navigation?.contact || "Contact"}
            </Link>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-[#5A554C] hover:text-[#243629] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>{footer?.backToTop || "Back to top"}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A554C]/80">
          <div>
            © {new Date().getFullYear()} Grow Tech.{" "}
            {footer?.tagline || "Websites and apps built to grow with your business."}
          </div>
          <div className="flex items-center gap-4">
            {valueProps.map((value, index) => (
              <React.Fragment key={value}>
                {index > 0 && <span>·</span>}
                <span>{value}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
