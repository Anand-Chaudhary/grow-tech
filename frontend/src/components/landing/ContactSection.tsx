"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { submitLead, ContactData, PricingPackageItem } from "@/lib/api";

interface ContactSectionProps {
  contact?: ContactData;
  packages?: PricingPackageItem[];
  initialTier?: "LAUNCH" | "GROWTH" | "SCALE" | "NOT_SURE";
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  packages,
  initialTier = "NOT_SURE",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    websiteUrl: "",
    packageTier: initialTier,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleSelectPlan = (e: any) => {
      const tier = e.detail?.tier;
      if (tier) {
        setFormData((prev) => ({ ...prev, packageTier: tier }));
      }
    };
    window.addEventListener("growtech:select-plan", handleSelectPlan);
    return () => {
      window.removeEventListener("growtech:select-plan", handleSelectPlan);
    };
  }, []);

  const badge = contact?.badge || "Contact";
  const heading = contact?.heading || "Have an idea?";
  const highlight = contact?.highlight || "Let's build it.";
  const subhead =
    contact?.subhead ||
    "Tell us about your targets, timeline, and budget. We reply within one business day with plain advice and zero sales pressure.";
  const nameLabel = contact?.nameLabel || "Name";
  const namePlaceholder = contact?.namePlaceholder || "Jane Doe";
  const emailLabel = contact?.emailLabel || "Email";
  const emailPlaceholder = contact?.emailPlaceholder || "jane@company.com";
  const messageLabel = contact?.messageLabel || "Tell us about the project";
  const messagePlaceholder =
    contact?.messagePlaceholder ||
    "What are you building, what is your timeframe, and what bottleneck are you solving?";
  const submitLabel = contact?.submitLabel || "Send Inquiry";
  const submittingLabel = contact?.submittingLabel || "Sending...";
  const requiredFieldsMessage =
    contact?.requiredFieldsMessage || "Please fill out all required fields.";
  const successHeading = contact?.successHeading || "Inquiry received.";
  const successMessage =
    contact?.successMessage ||
    "Thank you for reaching out. We will review your project details and get back to you within 24 hours.";
  const newInquiryLabel = contact?.newInquiryLabel || "Send another inquiry";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage(requiredFieldsMessage);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const res = await submitLead({
      name: formData.name.trim(),
      email: formData.email.trim(),
      websiteUrl: formData.websiteUrl.trim() || undefined,
      packageTier: formData.packageTier,
      goal: formData.message.trim(),
      message: formData.message.trim(),
    });

    if (res.success) {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        websiteUrl: "",
        packageTier: "NOT_SURE",
        message: "",
      });
    } else {
      setStatus("error");
      setErrorMessage(res.message);
    }
  };

  return (
    <section id="contact" className="w-full py-20 sm:py-28 border-t border-[#E2D9C6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#5A554C] block mb-3 font-medium">
              {badge}
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-[68px] leading-[1.08] text-[#16130F] font-normal tracking-[-0.03em]">
              {heading} <br />
              <span className="text-[#3D9129]">{highlight}</span>
            </h2>
            <p className="mt-6 text-sm text-[#5A554C] max-w-sm leading-relaxed">
              {subhead}
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
                  {successHeading}
                </h3>
                <p className="text-sm text-[#5A554C] max-w-md mx-auto mb-6">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#16130F] border border-[#16130F]/40 hover:bg-white transition-colors cursor-pointer"
                >
                  {newInquiryLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10">
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* NAME Field */}
                <div className="relative group">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    {nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={namePlaceholder}
                    className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] placeholder:text-stone-400 outline-none transition-colors"
                  />
                </div>

                {/* EMAIL Field */}
                <div className="relative group">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    {emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={emailPlaceholder}
                    className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] placeholder:text-stone-400 outline-none transition-colors"
                  />
                </div>

                {/* TELL US ABOUT THE PROJECT Field */}
                <div className="relative group">
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    {messageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={messagePlaceholder}
                    className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] placeholder:text-stone-400 outline-none resize-none transition-colors"
                  />
                </div>

                {/* Pricing Plan Dropdown */}
                <div className="relative group">
                  <label
                    htmlFor="contact-package-tier"
                    className="block text-[11px] font-mono tracking-[0.12em] uppercase text-[#5A554C] mb-1 font-semibold group-focus-within:text-[#243629]"
                  >
                    Select Pricing Plan / Scope
                  </label>
                  <div className="relative">
                    <select
                      id="contact-package-tier"
                      value={formData.packageTier}
                      onChange={(e) =>
                        setFormData({ ...formData, packageTier: e.target.value as any })
                      }
                      className="w-full py-3 bg-transparent border-b border-[#243629]/30 focus:border-[#243629] text-[15px] sm:text-base text-[#16130F] outline-none transition-colors cursor-pointer appearance-none pr-8"
                    >
                      {packages && packages.length > 0 ? (
                        packages.map((pkg) => (
                          <option
                            key={pkg.id || pkg.tier}
                            value={pkg.tier}
                            className="bg-[#FAF6EC] text-[#16130F]"
                          >
                            {pkg.name} {pkg.priceFrom ? `(from $${pkg.priceFrom.toLocaleString()})` : "(Custom Quote)"}
                            {pkg.isHighlighted ? " ★ Recommended" : ""}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="LAUNCH" className="bg-[#FAF6EC] text-[#16130F]">
                            Launch Package — from $4,999 (MVP & Sub-Second Speed)
                          </option>
                          <option value="GROWTH" className="bg-[#FAF6EC] text-[#16130F]">
                            Growth Package — from $9,999 ★ Most Popular (Scale & CRO)
                          </option>
                          <option value="SCALE" className="bg-[#FAF6EC] text-[#16130F]">
                            Scale & Enterprise — Custom Quote (Full Stack & Edge)
                          </option>
                        </>
                      )}
                      <option value="NOT_SURE" className="bg-[#FAF6EC] text-[#16130F]">
                        Custom / Advisory Consultation (Not sure yet)
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#5A554C] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Quick Tier Pills */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono tracking-[0.12em] uppercase text-[#5A554C]/70">
                    Or click to switch plan:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "LAUNCH", label: "Launch" },
                      { id: "GROWTH", label: "Growth ★" },
                      { id: "SCALE", label: "Scale" },
                      { id: "NOT_SURE", label: "Custom Scope" },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            packageTier: tier.id as any,
                          })
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                          formData.packageTier === tier.id
                            ? "bg-[#243629] text-white font-medium shadow-sm"
                            : "bg-[#FAF4E6] text-[#5A554C] border border-[#E2D9C6] hover:bg-[#EFE8D8]"
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
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
                        <span>{submittingLabel}</span>
                      </>
                    ) : (
                      <>
                        <span>{submitLabel}</span>
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
