"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="w-full py-20 sm:py-28 border-t border-[#E2D9C6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#5A554C] block mb-3 font-medium">
              Contact
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-[68px] leading-[1.08] text-[#16130F] font-normal tracking-[-0.03em]">
              Have an idea? <br />
              <span className="text-[#3D9129]">Let's build it.</span>
            </h2>
            <p className="mt-6 text-sm text-[#5A554C] max-w-sm leading-relaxed">
              Tell us about your targets, timeline, and budget. We reply within one business day with plain advice and zero sales pressure.
            </p>
          </div>

          {/* Right Column: Minimalist Underline Form */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="bg-[#FAF4E6] border border-[#E2D9C6] rounded-2xl p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-full bg-[#3D9129]/10 text-[#3D9129] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#16130F] mb-2">
                  Inquiry received.
                </h3>
                <p className="text-sm text-[#5A554C] max-w-md mx-auto mb-6">
                  Thank you for reaching out. We will review your project details and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#16130F] border border-[#16130F]/40 hover:bg-white transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10">
                {/* NAME Field */}
                <div className="relative group">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] placeholder:text-stone-400 outline-none transition-colors"
                  />
                </div>

                {/* EMAIL Field */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] placeholder:text-stone-400 outline-none transition-colors"
                  />
                </div>

                {/* TELL US ABOUT THE PROJECT Field */}
                <div className="relative group">
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    Tell us about the project
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="What are you building, what is your timeframe, and what bottleneck are you solving?"
                    className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] placeholder:text-stone-400 outline-none resize-none transition-colors"
                  />
                </div>

                {/* Submit Button matching screenshot */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#243629] hover:bg-[#1a281e] active:scale-95 transition-all shadow-md disabled:opacity-70 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
