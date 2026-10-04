import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080E09] text-[#F4FDF6] pt-24 pb-12 border-t border-[#C8F169]/20 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#C8F169]/15">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#C8F169] shadow-[0_0_12px_#C8F169] animate-pulse" />
              <span className="font-semibold text-[22px] tracking-tight text-[#F4FDF6]">
                Grow<span className="text-[#C8F169]">Tech</span>
              </span>
            </div>
            <p className="text-[16px] leading-relaxed text-[#9BB3A2] max-w-sm">
              Web development for small businesses ready to scale. Fast sites built like products, priced in the open, and 100% owned by you.
            </p>

            {/* Live Infrastructure Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0F1A12] border border-[#C8F169]/30 text-[13px] font-mono text-[#F4FDF6] w-fit shadow-[0_0_20px_rgba(200,241,105,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#C8F169] animate-pulse" />
              <span>Core Web Vitals: 100/100 · 0.8s LCP</span>
            </div>
          </div>

          {/* Nav Col 1: Solutions */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169]">
              Solutions
            </h4>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li>
                <Link href="/services#business-websites" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Business Sites
                </Link>
              </li>
              <li>
                <Link href="/services#online-stores" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Online Stores
                </Link>
              </li>
              <li>
                <Link href="/services#booking-lead-systems" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Booking Systems
                </Link>
              </li>
              <li>
                <Link href="/services#care-growth-plans" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Care Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Navigation */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169]">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li>
                <Link href="/work" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Recent Work
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Our Method
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#9BB3A2] hover:text-[#C8F169] transition-colors">
                  Pricing Matrix
                </Link>
              </li>
              <li>
                <Link href="/review" className="text-[#C8F169] hover:underline inline-flex items-center gap-1 font-semibold">
                  Free Review <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono text-[12px] uppercase tracking-wider text-[#C8F169]">
              Direct Line
            </h4>
            <div className="flex flex-col gap-2 text-[15px] text-[#9BB3A2]">
              <p>Email: <a href="mailto:hello@growtech.dev" className="text-[#F4FDF6] hover:text-[#C8F169] transition-colors">hello@growtech.dev</a></p>
              <p>Response: Within 2 working days</p>
              <p className="text-[13px] text-[#9BB3A2]/80 pt-1">
                Zero spam. You speak directly with the engineers building your code.
              </p>
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-[13px] text-[#C8F169]">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Client Ownership Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#9BB3A2]">
          <p>© {new Date().getFullYear()} Grow Tech. Solid engineering, zero lock-in, client-owned code.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[12px] text-[#9BB3A2]/60 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#C8F169]" /> Built with Next.js 16 &amp; TypeScript
            </span>
            <Link href="/#faq" className="hover:text-[#C8F169] transition-colors">
              Privacy &amp; Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
