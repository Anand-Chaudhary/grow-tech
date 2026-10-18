"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { NavigationData } from "@/lib/api";
import logo from '@/assets/logo.svg'

export interface NavItem {
  label: string;
  href: string;
  key: keyof NavigationData;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "/#about", key: "about" },
  { label: "Services", href: "/services", key: "services" },
  { label: "Portfolio", href: "/projects", key: "portfolio" },
  { label: "Pricing", href: "/#pricing", key: "pricing" as any },
  { label: "Contact", href: "/contact", key: "contact" },
];

interface NavbarProps {
  navigation?: NavigationData;
}

export const Navbar: React.FC<NavbarProps> = ({ navigation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    label: navigation?.[item.key] || item.label,
  }));
  const actionLabel = navigation?.action || "Start a project";

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
      {/* Top right utility bar: Social icons as requested: Facebook, Instagram, Twitter, LinkedIn */}
      <div className="w-full flex justify-end items-center gap-3.5 mb-2.5 text-[#5A554C] pr-2 sm:pr-6">
        {/* Facebook */}
        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#243629] transition-colors p-1"
          aria-label="Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </Link>

        {/* Instagram */}
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#243629] transition-colors p-1"
          aria-label="Instagram"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Link>

        {/* Twitter / X */}
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#243629] transition-colors p-1"
          aria-label="Twitter / X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#243629] transition-colors p-1"
          aria-label="LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </Link>
      </div>

      {/* Floating Pill Navbar */}
      <nav
        className="w-full max-w-4xl bg-white/90 backdrop-blur-md border border-[#E2D9C6]/80 rounded-full px-4 sm:px-6 py-2.5 shadow-[0_2px_12px_rgba(36,54,41,0.04)] flex items-center justify-between transition-all duration-300 relative z-50"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <Image src={logo} alt="Logo" width={100} height={100} priority />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-7 text-[14px] font-medium text-[#2E3A1B]/80">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[#243629] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#3D9129] hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Action Button: Orange/Amber pill button as in the image */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[13.5px] font-semibold text-white bg-[#F9AD1B] hover:bg-[#e0980f] active:scale-95 transition-all shadow-[0_2px_10px_rgba(249,173,27,0.25)] hover:shadow-[0_4px_14px_rgba(249,173,27,0.35)]"
          >
            {actionLabel}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex sm:hidden items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#F9AD1B]"
          >
            {actionLabel}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-[#243629] hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="w-full max-w-md mt-2 bg-white/95 backdrop-blur-lg border border-[#E2D9C6] rounded-2xl p-5 shadow-xl md:hidden flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 z-40">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[15px] font-medium text-[#2E3A1B] hover:text-[#3D9129] py-1.5 px-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E2D9C6]/60">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#F9AD1B] hover:bg-[#e0980f] transition-all"
            >
              <span>{actionLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
