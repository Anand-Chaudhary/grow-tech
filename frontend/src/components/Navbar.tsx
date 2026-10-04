"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-5 transition-all duration-300">
      <div className="max-w-[1180px] mx-auto">
        <nav
          className={`flex items-center justify-between h-[60px] sm:h-[64px] px-6 sm:px-8 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#090E0A]/90 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "bg-[#090E0A]/60 border-white/10 backdrop-blur-md"
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Wordmark Left */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group py-1"
            aria-label="Grow Tech Home"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8F169] shadow-[0_0_8px_#C8F169] animate-pulse" />
            <span className="font-semibold text-[19px] tracking-tight text-[#F4FDF6]">
              Grow<span className="text-[#C8F169]">Tech</span>
            </span>
          </Link>

          {/* Navigation Links Center */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[14px] font-medium transition-colors hover:text-[#C8F169] ${
                    isActive ? "text-[#C8F169] font-semibold" : "text-[#9BB3A2]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/review"
              className="btn-primary-leaf h-[42px] px-6 text-[13.5px] flex items-center gap-1.5"
            >
              <span>Book free review</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/review"
              className="inline-flex items-center h-[34px] px-3.5 rounded-full bg-[#C8F169] text-[#080E09] font-semibold text-[12px]"
            >
              Free review
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#F4FDF6] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C8F169]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="mt-2.5 sm:hidden rounded-[24px] border border-white/15 bg-[#090E0A]/95 backdrop-blur-xl p-5 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[16px] font-medium text-[#F4FDF6] py-2 border-b border-white/10 flex items-center justify-between hover:text-[#C8F169]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C8F169]" />
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/review"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary-leaf w-full text-center h-[48px] rounded-full text-[14px] flex items-center justify-center gap-2"
              >
                <span>Book 20-min free review</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
