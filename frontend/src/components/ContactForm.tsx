"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    goal: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="rounded-[32px] border border-[#C8F169]/30 bg-[#0F1A12]/95 backdrop-blur-xl p-8 sm:p-16 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Editorial Pitch */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169]">
            Direct Engineering Review
          </div>

          <h2 className="text-[36px] sm:text-[48px] font-semibold text-[#F4FDF6] leading-[1.05] tracking-tight">
            Let&apos;s look at your site together.
          </h2>

          <p className="text-[18px] sm:text-[20px] text-[#9BB3A2] leading-relaxed">
            Tell us where your business is heading. We&apos;ll send a short, prioritised teardown and architecture review within 2 working days.
          </p>

          <div className="pt-6 flex flex-col gap-5 border-t border-[#C8F169]/15">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-[#C8F169] shrink-0 mt-1" />
              <div>
                <strong className="text-[16px] font-semibold text-[#F4FDF6] block">
                  20 minutes. Zero sales pitch deck.
                </strong>
                <p className="text-[#9BB3A2] text-[14px] mt-1 leading-relaxed">
                  You leave with concrete, actionable recommendations whether you hire Grow Tech or not.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-[#C8F169] shrink-0 mt-1" />
              <div>
                <strong className="text-[16px] font-semibold text-[#F4FDF6] block">
                  Speak directly with engineers.
                </strong>
                <p className="text-[#9BB3A2] text-[14px] mt-1 leading-relaxed">
                  No junior account reps or aggressive follow-up spam. Just technical and conversion clarity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: 4-Field Form (Document Spec) */}
        <div className="lg:col-span-6 bg-[#142318] rounded-[28px] border border-[#C8F169]/25 p-8 sm:p-12 shadow-lg">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#1E3324] border border-[#C8F169] flex items-center justify-center text-[#C8F169] shadow-[0_0_20px_#C8F169]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-[26px] font-semibold text-[#F4FDF6]">
                Review Request Received
              </h3>
              <p className="text-[16px] text-[#9BB3A2] max-w-sm leading-relaxed">
                Thank you, {formData.name}. We are preparing your site diagnosis and will email you at{" "}
                <span className="font-semibold text-[#C8F169]">{formData.email}</span> within 2 working days.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", website: "", goal: "" });
                }}
                className="mt-3 text-[14px] font-medium text-[#C8F169] underline cursor-pointer"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[14px] font-medium text-[#F4FDF6] mb-2">
                  Your Name <span className="text-[#C8F169]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Miller"
                  className="w-full h-[52px] px-5 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#F4FDF6] text-[15px] outline-none focus:border-[#C8F169] transition-colors placeholder:text-[#9BB3A2]/60"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#F4FDF6] mb-2">
                  Work Email <span className="text-[#C8F169]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@yourcompany.com"
                  className="w-full h-[52px] px-5 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#F4FDF6] text-[15px] outline-none focus:border-[#C8F169] transition-colors placeholder:text-[#9BB3A2]/60"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#F4FDF6] mb-2">
                  Current Website Address <span className="text-[#9BB3A2] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourcompany.com"
                  className="w-full h-[52px] px-5 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#F4FDF6] text-[15px] outline-none focus:border-[#C8F169] transition-colors placeholder:text-[#9BB3A2]/60"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#F4FDF6] mb-2">
                  What are you hoping to grow?
                </label>
                <textarea
                  rows={3}
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="e.g. Mobile enquiries dropped after a template redesign, or we need a booking system that doesn't drag."
                  className="w-full p-5 rounded-2xl bg-[#080E09] border border-[#C8F169]/30 text-[#F4FDF6] text-[15px] outline-none focus:border-[#C8F169] transition-colors resize-none placeholder:text-[#9BB3A2]/60"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-leaf w-full h-[56px] text-[16px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting review request...</span>
                  ) : (
                    <>
                      <span>Get my free site review</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[13px] text-[#9BB3A2] text-center pt-2">
                We use your details only to reply to this request. Zero spam or sales lists.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
