"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Plus,
  Save,
  Trash2,
  ArrowRight,
  Layers,
  Briefcase,
  DollarSign,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  getLandingData,
  updateLandingData,
  LandingPageData,
  ShowcaseCard,
} from "@/lib/api";

import { TextField, SectionCard } from "./components";

type EditableSection =
  | "hero"
  | "navigation"
  | "manifesto"
  | "contact"
  | "footer";

const fieldClass =
  "w-full p-2 bg-[#FAF6EC] border border-[#E2D9C6] rounded text-sm text-[#16130F]";
const labelClass = "block text-xs font-mono uppercase text-[#5A554C] mb-1";

const emptyShowcaseCard = (index: number): ShowcaseCard => ({
  id: `card-${Date.now()}-${index}`,
  tag: "",
  title: "",
  metric: "",
  variant: "analytics",
});

export default function LandingContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<LandingPageData>>({});

  useEffect(() => {
    getLandingData()
      .then((data) => {
        if (!data) {
          setError("Could not load landing page data.");
          return;
        }
        setForm({
          hero: {
            ...data.hero,
            actions: {
              primary: data.hero?.actions?.primary || "Start a project",
              secondary: data.hero?.actions?.secondary || "Explore our work",
            },
          },
          navigation: {
            home: data.navigation?.home || "Home",
            about: data.navigation?.about || "About",
            services: data.navigation?.services || "Services",
            portfolio: data.navigation?.portfolio || "Portfolio",
            clients: data.navigation?.clients || "Clients",
            contact: data.navigation?.contact || "Contact",
            action: data.navigation?.action || "Start a project",
          },
          manifesto: data.manifesto,
          contact: {
            ...data.contact,
            badge: data.contact?.badge || "Contact",
            heading: data.contact?.heading || "Have an idea?",
            highlight: data.contact?.highlight || "Let's build it.",
            subhead:
              data.contact?.subhead ||
              "Tell us about your targets, timeline, and budget. We reply within one business day with plain advice and zero sales pressure.",
            nameLabel: data.contact?.nameLabel || "Name",
            namePlaceholder: data.contact?.namePlaceholder || "Jane Doe",
            emailLabel: data.contact?.emailLabel || "Email",
            emailPlaceholder: data.contact?.emailPlaceholder || "jane@company.com",
            messageLabel:
              data.contact?.messageLabel || "Tell us about the project",
            messagePlaceholder:
              data.contact?.messagePlaceholder ||
              "What are you building, what is your timeframe, and what bottleneck are you solving?",
            submitLabel: data.contact?.submitLabel || "Send Inquiry",
            submittingLabel: data.contact?.submittingLabel || "Sending...",
            requiredFieldsMessage:
              data.contact?.requiredFieldsMessage ||
              "Please fill out all required fields.",
            successHeading: data.contact?.successHeading || "Inquiry received.",
            successMessage:
              data.contact?.successMessage ||
              "Thank you for reaching out. We will review your project details and get back to you within 24 hours.",
            newInquiryLabel:
              data.contact?.newInquiryLabel || "Send another inquiry",
          },
          footer: {
            backToTop: data.footer?.backToTop || "Back to top",
            tagline:
              data.footer?.tagline ||
              "Websites and apps built to grow with your business.",
            valueProps: data.footer?.valueProps || [
              "Client-owned code & domains",
              "Zero lock-in",
            ],
          },
        });
      })
      .catch((err) => {
        console.warn("[Admin] Failed to fetch landing data:", err);
        setError("Could not load landing page data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateSection = <K extends EditableSection>(
    section: K,
    payload: Partial<NonNullable<LandingPageData[K]>>
  ) => {
    setForm((previous) => ({
      ...previous,
      [section]: { ...(previous[section] ?? {}), ...payload },
    }));
    setSuccess(null);
  };

  const updateShowcaseCard = (
    index: number,
    field: keyof ShowcaseCard,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        marqueeCards: (previous.hero?.marqueeCards ?? []).map(
          (card, currentIndex) =>
            currentIndex === index ? { ...card, [field]: value } : card
        ),
      },
    }));
    setSuccess(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    const result = await updateLandingData(form);
    setSaving(false);
    if (result.success) {
      setSuccess("Landing page content saved successfully!");
    } else {
      setError(result.message || "Failed to update landing page data.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#3D9129]" />
        <span className="ml-2 text-[#5A554C]">Loading landing data…</span>
      </div>
    );
  }

  const hero = form.hero;
  const indicators = hero?.indicators;
  const marqueeCards = hero?.marqueeCards ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E2D9C6]/60">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-2">
            <FileText className="w-3.5 h-3.5 text-[#3D9129]" />
            CORE CONTENT & SEO
          </div>
          <h1 className="text-3xl font-serif text-[#16130F]">Landing Page Content</h1>
          <p className="mt-1 text-sm text-[#5A554C]">
            Edit typography, hero showcase marquee, navigation labels, manifesto copy, and contact form wording.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#243629] hover:bg-[#1a281e] transition-colors shadow-sm disabled:opacity-50 self-start sm:self-auto"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? "Saving..." : "Save Content"}</span>
        </button>
      </div>

      {/* Quick Navigation Cards to Dedicated Pages */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/admin/services"
          className="p-4 sm:p-5 rounded-2xl border border-[#E2D9C6] bg-white hover:border-[#3D9129]/60 hover:bg-[#FAF6EC]/30 transition-all flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3D9129]/10 text-[#243629] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-[#3D9129]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-sm text-[#16130F] group-hover:text-[#3D9129] transition-colors">
                Services
              </h3>
              <p className="text-[11px] text-[#5A554C]">
                Edit service cards & deliverables
              </p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#5A554C] group-hover:translate-x-1 group-hover:text-[#3D9129] transition-all shrink-0" />
        </Link>

        <Link
          href="/admin/projects"
          className="p-4 sm:p-5 rounded-2xl border border-[#E2D9C6] bg-white hover:border-[#3D9129]/60 hover:bg-[#FAF6EC]/30 transition-all flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#243629]/10 text-[#243629] flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-[#243629]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-sm text-[#16130F] group-hover:text-[#3D9129] transition-colors">
                Projects
              </h3>
              <p className="text-[11px] text-[#5A554C]">
                Manage case studies & metrics
              </p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#5A554C] group-hover:translate-x-1 group-hover:text-[#3D9129] transition-all shrink-0" />
        </Link>

        <Link
          href="/admin/pricing"
          className="p-4 sm:p-5 rounded-2xl border border-[#E2D9C6] bg-white hover:border-[#3D9129]/60 hover:bg-[#FAF6EC]/30 transition-all flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3D9129]/10 text-[#243629] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 text-[#3D9129]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-sm text-[#16130F] group-hover:text-[#3D9129] transition-colors">
                Pricing Plans
              </h3>
              <p className="text-[11px] text-[#5A554C]">
                Configure tiers, rates & highlights
              </p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#5A554C] group-hover:translate-x-1 group-hover:text-[#3D9129] transition-all shrink-0" />
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Navigation Links */}
      <SectionCard title="Header Navigation Links">
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["home", "Home link"],
              ["about", "About link"],
              ["services", "Services link"],
              ["portfolio", "Portfolio link"],
              ["clients", "Clients link"],
              ["contact", "Contact link"],
              ["action", "Call to action button"],
            ] as const
          ).map(([key, label]) => (
            <TextField
              key={key}
              label={label}
              value={form.navigation?.[key] ?? ""}
              onChange={(value) => updateSection("navigation", { [key]: value })}
            />
          ))}
        </div>
      </SectionCard>

      {/* Hero Section */}
      <SectionCard title="Hero Section">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Main Headline"
            value={hero?.headline ?? ""}
            onChange={(headline) => updateSection("hero", { headline })}
          />
          <TextField
            label="Highlighted Words (Green)"
            value={hero?.highlightWord ?? ""}
            onChange={(highlightWord) => updateSection("hero", { highlightWord })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Subheading"
              rows={3}
              value={hero?.subhead ?? ""}
              onChange={(subhead) => updateSection("hero", { subhead })}
            />
          </div>
          <TextField
            label="Primary Button Text"
            value={hero?.actions?.primary ?? ""}
            onChange={(primary) =>
              updateSection("hero", {
                actions: { ...hero?.actions, primary },
              })
            }
          />
          <TextField
            label="Secondary Button Text"
            value={hero?.actions?.secondary ?? ""}
            onChange={(secondary) =>
              updateSection("hero", {
                actions: { ...hero?.actions, secondary },
              })
            }
          />
        </div>

        <h3 className="pt-3 font-medium text-[#16130F]">Hero Indicators</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {(["social", "scale", "launch"] as const).map((key) => (
            <div key={key} className="space-y-3 rounded-xl border border-[#E2D9C6] p-4 bg-[#FAF6EC]/30">
              <TextField
                label={`${key} Label`}
                value={indicators?.[key]?.label ?? ""}
                onChange={(label) =>
                  updateSection("hero", {
                    indicators: {
                      ...indicators,
                      [key]: { ...indicators?.[key], label },
                    },
                  })
                }
              />
              <TextField
                label="Description"
                rows={3}
                value={indicators?.[key]?.description ?? ""}
                onChange={(description) =>
                  updateSection("hero", {
                    indicators: {
                      ...indicators,
                      [key]: { ...indicators?.[key], description },
                    },
                  })
                }
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3">
          <h3 className="font-medium text-[#16130F]">Marquee Cards</h3>
          <button
            type="button"
            onClick={() =>
              updateSection("hero", {
                marqueeCards: [...marqueeCards, emptyShowcaseCard(marqueeCards.length)],
              })
            }
            className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
          >
            <Plus className="h-4 w-4" /> Add Marquee Card
          </button>
        </div>

        <div className="space-y-4">
          {marqueeCards.map((card, index) => (
            <div key={card.id || index} className="space-y-3 rounded-xl border border-[#E2D9C6] p-4 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#16130F]">Card {index + 1}</h4>
                <button
                  type="button"
                  aria-label={`Remove marquee card ${index + 1}`}
                  onClick={() =>
                    updateSection("hero", {
                      marqueeCards: marqueeCards.filter((_, cardIndex) => cardIndex !== index),
                    })
                  }
                  className="rounded p-1 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Tag"
                  value={card.tag}
                  onChange={(value) => updateShowcaseCard(index, "tag", value)}
                />
                <TextField
                  label="Title"
                  value={card.title}
                  onChange={(value) => updateShowcaseCard(index, "title", value)}
                />
                <TextField
                  label="Metric"
                  value={card.metric ?? ""}
                  onChange={(value) => updateShowcaseCard(index, "metric", value)}
                />
                <label className="block">
                  <span className={labelClass}>Visual Style</span>
                  <select
                    value={card.variant}
                    onChange={(event) =>
                      updateShowcaseCard(index, "variant", event.target.value as any)
                    }
                    className={fieldClass}
                  >
                    {["analytics", "store", "system", "mobile", "editorial", "cloud"].map(
                      (variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Manifesto / About */}
      <SectionCard title="About & Manifesto">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Heading"
            value={form.manifesto?.heading ?? ""}
            onChange={(heading) => updateSection("manifesto", { heading })}
          />
          <TextField
            label="Highlighted Text"
            value={form.manifesto?.highlight ?? ""}
            onChange={(highlight) => updateSection("manifesto", { highlight })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Paragraphs (one per line)"
              rows={4}
              value={form.manifesto?.paragraphs?.join("\n") ?? ""}
              onChange={(value) =>
                updateSection("manifesto", { paragraphs: value.split("\n") })
              }
            />
          </div>
        </div>
      </SectionCard>

      {/* Contact Section Copy */}
      <SectionCard title="Contact Section Copy & Form Settings">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Badge"
            value={form.contact?.badge ?? ""}
            onChange={(badge) => updateSection("contact", { badge })}
          />
          <TextField
            label="Heading"
            value={form.contact?.heading ?? ""}
            onChange={(heading) => updateSection("contact", { heading })}
          />
          <TextField
            label="Highlighted Text"
            value={form.contact?.highlight ?? ""}
            onChange={(highlight) => updateSection("contact", { highlight })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Subheading"
              rows={2}
              value={form.contact?.subhead ?? ""}
              onChange={(subhead) => updateSection("contact", { subhead })}
            />
          </div>

          {(
            [
              ["nameLabel", "Name field label"],
              ["namePlaceholder", "Name placeholder"],
              ["emailLabel", "Email field label"],
              ["emailPlaceholder", "Email placeholder"],
              ["messageLabel", "Message field label"],
              ["messagePlaceholder", "Message placeholder"],
              ["submitLabel", "Submit button label"],
              ["submittingLabel", "Submitting state label"],
              ["requiredFieldsMessage", "Required fields error message"],
              ["successHeading", "Success state heading"],
              ["successMessage", "Success state description"],
              ["newInquiryLabel", "Send another inquiry button label"],
            ] as const
          ).map(([key, label]) => (
            <div
              key={key}
              className={
                key === "messagePlaceholder" ||
                key === "requiredFieldsMessage" ||
                key === "successMessage"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <TextField
                label={label}
                rows={
                  key === "messagePlaceholder" ||
                  key === "requiredFieldsMessage" ||
                  key === "successMessage"
                    ? 2
                    : undefined
                }
                value={form.contact?.[key] ?? ""}
                onChange={(value) => updateSection("contact", { [key]: value })}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Footer */}
      <SectionCard title="Footer Settings">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Tagline"
            value={form.footer?.tagline ?? ""}
            onChange={(tagline) => updateSection("footer", { tagline })}
          />
          <TextField
            label="Back to Top Button Label"
            value={form.footer?.backToTop ?? ""}
            onChange={(backToTop) => updateSection("footer", { backToTop })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Value Propositions (one per line)"
              rows={3}
              value={form.footer?.valueProps?.join("\n") ?? ""}
              onChange={(value) =>
                updateSection("footer", {
                  valueProps: value.split("\n").filter(Boolean),
                })
              }
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
