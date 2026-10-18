"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  getLandingData,
  updateLandingData,
  PricingPackageItem,
  PricingSectionData,
} from "@/lib/api";

const fieldClass =
  "w-full p-2.5 bg-[#FAF6EC] border border-[#E2D9C6] rounded-lg text-sm text-[#16130F] focus:outline-none focus:ring-2 focus:ring-[#3D9129]/30 focus:border-[#3D9129] transition-all";
const labelClass =
  "block text-xs font-mono uppercase tracking-wider text-[#5A554C] mb-1.5 font-medium";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  type?: string;
}

function TextField({
  label,
  value,
  onChange,
  rows,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} resize-y leading-relaxed`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      )}
    </label>
  );
}

const emptyPackage = (index: number): PricingPackageItem => ({
  id: `pkg-${Date.now()}-${index}`,
  tier: "LAUNCH",
  name: "New Package",
  bestFor: "Ideal for teams needing custom digital solutions.",
  features: ["Next.js & React 19", "Sub-second LCP Guarantee", "100% Client Ownership"],
  priceFrom: 4999,
  currency: "USD",
  priceNote: "Fixed scope delivery",
  isHighlighted: false,
  isActive: true,
  sortOrder: index + 1,
});

export default function AdminPricingPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [sectionData, setSectionData] = useState<PricingSectionData>({
    badge: "Transparent Pricing",
    heading: "Engineered packages",
    highlight: "built to scale.",
    subhead:
      "Guaranteed sub-second speed, 100% client code ownership, and zero agency markups. Select a package to start your inquiry.",
  });

  const [packages, setPackages] = useState<PricingPackageItem[]>([]);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(0);

  useEffect(() => {
    getLandingData()
      .then((data) => {
        if (!data) {
          setError("Could not load pricing data from server.");
          return;
        }
        if (data.pricingSection) {
          setSectionData({
            badge: data.pricingSection.badge || "Transparent Pricing",
            heading: data.pricingSection.heading || "Engineered packages",
            highlight: data.pricingSection.highlight || "built to scale.",
            subhead:
              data.pricingSection.subhead ||
              "Guaranteed sub-second speed, 100% client code ownership, and zero agency markups.",
          });
        }
        if (data.packages && data.packages.length > 0) {
          setPackages(data.packages);
        } else {
          setPackages([
            {
              id: "pkg-launch",
              tier: "LAUNCH",
              name: "Launch Package",
              bestFor: "Early-stage startups and lean teams needing an ultra-fast MVP",
              features: [
                "Next.js 15 & React 19 App Router",
                "Sub-second Largest Contentful Paint (<0.8s)",
                "Mobile-first responsive viewports",
                "Technical SEO structure & Schema markup",
                "100% code & domain ownership",
              ],
              priceFrom: 4999,
              currency: "USD",
              priceNote: "Fixed scope • 2-3 weeks turnaround",
              isHighlighted: false,
              isActive: true,
              sortOrder: 1,
            },
            {
              id: "pkg-growth",
              tier: "GROWTH",
              name: "Growth Package",
              bestFor: "Scaling brands demanding conversion optimization and rock-solid uptime",
              features: [
                "Everything in Launch Package",
                "Headless CMS or Shopify checkout integration",
                "Conversion Rate Optimization (CRO) audit",
                "Guaranteed 95+ Core Web Vitals benchmark",
                "Automated lead capture & analytics tracking",
                "Dedicated Slack channel & priority SLA",
              ],
              priceFrom: 9999,
              currency: "USD",
              priceNote: "Most popular • 4-6 weeks delivery",
              isHighlighted: true,
              isActive: true,
              sortOrder: 2,
            },
            {
              id: "pkg-scale",
              tier: "SCALE",
              name: "Scale & Enterprise",
              bestFor: "Established enterprises and high-load web applications",
              features: [
                "Everything in Growth Package",
                "Custom full-stack web applications & microservices",
                "High-throughput edge caching & database design",
                "Role-based access control & security compliance",
                "Automated CI/CD test suite & zero-downtime deploy",
              ],
              priceFrom: null,
              currency: "USD",
              priceNote: "Custom quote based on technical scope",
              isHighlighted: false,
              isActive: true,
              sortOrder: 3,
            },
          ]);
        }
      })
      .catch((err) => {
        console.warn("[Admin Pricing] Error loading data:", err);
        setError("Could not connect to backend server.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdatePackage = (
    index: number,
    field: keyof PricingPackageItem,
    value: any
  ) => {
    setPackages((prev) =>
      prev.map((pkg, i) => (i === index ? { ...pkg, [field]: value } : pkg))
    );
    setSuccess(null);
  };

  const handleUpdateFeatures = (index: number, text: string) => {
    const list = text
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    setPackages((prev) =>
      prev.map((pkg, i) => (i === index ? { ...pkg, features: list } : pkg))
    );
    setSuccess(null);
  };

  const handleAddPackage = () => {
    const newPkg = emptyPackage(packages.length);
    setPackages((prev) => [...prev, newPkg]);
    setActivePreviewIndex(packages.length);
    setSuccess(null);
  };

  const handleRemovePackage = (index: number) => {
    setPackages((prev) => prev.filter((_, i) => i !== index));
    if (activePreviewIndex === index) {
      setActivePreviewIndex(null);
    }
    setSuccess(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = {
      pricingSection: sectionData,
      packages,
    };

    const res = await updateLandingData(payload as any);
    setSaving(false);
    if (res.success) {
      setSuccess("Pricing plans updated successfully! Changes are live on the site.");
    } else {
      setError(res.message || "Failed to update pricing plans.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[#3D9129]" />
        <span className="ml-2 text-sm text-[#5A554C]">Loading pricing plans...</span>
      </div>
    );
  }

  const activePackage =
    activePreviewIndex !== null ? packages[activePreviewIndex] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E2D9C6]/60">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-2">
            <DollarSign className="w-3.5 h-3.5 text-[#3D9129]" />
            SUPERADMIN PRICING MANAGEMENT
          </div>
          <h1 className="text-3xl font-serif text-[#16130F]">Pricing Plans & Tiers</h1>
          <p className="mt-1 text-sm text-[#5A554C]">
            Configure plan pricing, deliverable checklists, highlight badges, and rates displayed on the live site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddPackage}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2D9C6] bg-white text-xs font-semibold text-[#16130F] hover:bg-[#FAF6EC] transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#3D9129]" />
            Add Plan
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#243629] hover:bg-[#1a281e] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "Saving..." : "Save All Changes"}</span>
          </button>
        </div>
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

      {/* Pricing Section Global Metadata */}
      <div className="rounded-2xl border border-[#E2D9C6] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-serif text-[#16130F] mb-4">
          Section Headline & Subhead
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField
            label="Section Badge"
            value={sectionData.badge || ""}
            placeholder="Transparent Pricing"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, badge: val }))
            }
          />
          <TextField
            label="Headline"
            value={sectionData.heading || ""}
            placeholder="Engineered packages"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, heading: val }))
            }
          />
          <TextField
            label="Highlighted Text (Green)"
            value={sectionData.highlight || ""}
            placeholder="built to scale."
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, highlight: val }))
            }
          />
          <div className="sm:col-span-3">
            <TextField
              label="Subheading Description"
              rows={2}
              value={sectionData.subhead || ""}
              placeholder="Guaranteed sub-second speed, 100% client code ownership, and zero agency markups."
              onChange={(val) =>
                setSectionData((prev) => ({ ...prev, subhead: val }))
              }
            />
          </div>
        </div>
      </div>

      {/* Pricing Plans Grid and Live Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-[#16130F]">
            Pricing Plans ({packages.length})
          </h2>
          <span className="text-xs text-[#5A554C]">
            Each plan is available on the landing page and selectable in the enquiry dropdown.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Plans Form Cards */}
          <div className="lg:col-span-7 space-y-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id || index}
                className={`rounded-2xl border p-6 shadow-sm transition-all space-y-4 ${
                  pkg.isHighlighted
                    ? "bg-[#FAF6EC]/80 border-[#3D9129]/60"
                    : "bg-white border-[#E2D9C6] hover:border-[#3D9129]/40"
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E2D9C6]/60">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF6EC] font-mono text-xs font-bold text-[#3D9129] border border-[#E2D9C6]">
                      {index + 1}
                    </span>
                    <span className="font-serif font-medium text-[#16130F]">
                      {pkg.name}
                    </span>
                    {pkg.isHighlighted && (
                      <span className="px-2 py-0.5 rounded-full bg-[#3D9129] text-white text-[10px] font-mono font-semibold">
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePreviewIndex(index)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                        activePreviewIndex === index
                          ? "bg-[#3D9129]/10 text-[#243629] font-medium"
                          : "text-[#5A554C] hover:bg-[#FAF6EC]"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>

                    <button
                      type="button"
                      aria-label={`Remove plan ${pkg.name}`}
                      onClick={() => handleRemovePackage(index)}
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Plan Name"
                    value={pkg.name}
                    placeholder="e.g. Growth Package"
                    onChange={(val) => handleUpdatePackage(index, "name", val)}
                  />

                  <label className="block">
                    <span className={labelClass}>Tier Key (Internal & Form)</span>
                    <select
                      value={pkg.tier}
                      onChange={(e) =>
                        handleUpdatePackage(index, "tier", e.target.value)
                      }
                      className={fieldClass}
                    >
                      <option value="LAUNCH">LAUNCH</option>
                      <option value="GROWTH">GROWTH</option>
                      <option value="SCALE">SCALE</option>
                      <option value="NOT_SURE">NOT_SURE</option>
                    </select>
                  </label>

                  <TextField
                    label="Starting Price (Leave empty for Custom)"
                    type="number"
                    value={pkg.priceFrom !== null && pkg.priceFrom !== undefined ? String(pkg.priceFrom) : ""}
                    placeholder="e.g. 4999 (leave blank for Custom)"
                    onChange={(val) =>
                      handleUpdatePackage(
                        index,
                        "priceFrom",
                        val.trim() === "" ? null : Number(val)
                      )
                    }
                  />

                  <TextField
                    label="Currency (USD, EUR, INR)"
                    value={pkg.currency || "USD"}
                    placeholder="USD"
                    onChange={(val) => handleUpdatePackage(index, "currency", val)}
                  />

                  <div className="sm:col-span-2">
                    <TextField
                      label="Price Subnote / Turnaround"
                      value={pkg.priceNote || ""}
                      placeholder="e.g. Fixed scope • 2-3 weeks turnaround"
                      onChange={(val) => handleUpdatePackage(index, "priceNote", val)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <TextField
                      label="Target Audience / Best For"
                      rows={2}
                      value={pkg.bestFor}
                      placeholder="e.g. Early-stage startups and lean teams needing a sub-second MVP"
                      onChange={(val) => handleUpdatePackage(index, "bestFor", val)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <TextField
                      label="Deliverables / Features (one per line)"
                      rows={4}
                      value={pkg.features?.join("\n") || ""}
                      placeholder="Next.js 15 & React 19 App Router&#10;Sub-second Largest Contentful Paint (<0.8s)&#10;Technical SEO structure&#10;100% code ownership"
                      onChange={(val) => handleUpdateFeatures(index, val)}
                    />
                  </div>
                </div>

                {/* Toggles: Highlighted & Active */}
                <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#E2D9C6]/60 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(pkg.isHighlighted)}
                      onChange={(e) =>
                        handleUpdatePackage(index, "isHighlighted", e.target.checked)
                      }
                      className="w-4 h-4 text-[#3D9129] rounded border-[#E2D9C6] focus:ring-[#3D9129]"
                    />
                    <span className="font-medium text-[#16130F]">
                      Highlighted Plan (Shows "Most Popular" badge & Olive Dark style)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={pkg.isActive !== false}
                      onChange={(e) =>
                        handleUpdatePackage(index, "isActive", e.target.checked)
                      }
                      className="w-4 h-4 text-[#3D9129] rounded border-[#E2D9C6] focus:ring-[#3D9129]"
                    />
                    <span className="text-[#5A554C]">Active on Website</span>
                  </label>
                </div>
              </div>
            ))}

            {packages.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-[#E2D9C6] rounded-2xl bg-white/50">
                <p className="text-sm text-[#5A554C] mb-4">No pricing plans defined yet.</p>
                <button
                  type="button"
                  onClick={handleAddPackage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#243629] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add First Plan
                </button>
              </div>
            )}
          </div>

          {/* Sticky Visual Card Preview */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="rounded-2xl border border-[#E2D9C6] bg-[#FAF6EC] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5A554C]">
                  <Sparkles className="w-3.5 h-3.5 text-[#3D9129]" />
                  Card Preview
                </div>
                <span className="text-xs text-[#5A554C]">
                  {activePackage ? activePackage.name : "No selection"}
                </span>
              </div>

              {activePackage ? (
                <div
                  className={`rounded-3xl p-8 transition-all shadow-md relative ${
                    activePackage.isHighlighted
                      ? "bg-[#243629] text-white ring-2 ring-[#3D9129]"
                      : "bg-white text-[#16130F] border border-[#E2D9C6]"
                  }`}
                >
                  {activePackage.isHighlighted && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#3D9129] text-white text-[10px] font-mono font-semibold">
                      MOST POPULAR
                    </div>
                  )}

                  <span
                    className={`text-xs font-mono uppercase tracking-widest block mb-2 font-semibold ${
                      activePackage.isHighlighted
                        ? "text-[#A2E391]"
                        : "text-[#5A554C]"
                    }`}
                  >
                    {activePackage.tier} TIER
                  </span>

                  <h3
                    className={`font-serif text-2xl mb-2 ${
                      activePackage.isHighlighted ? "text-white" : "text-[#16130F]"
                    }`}
                  >
                    {activePackage.name || "Plan Name"}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-6 font-light ${
                      activePackage.isHighlighted
                        ? "text-white/80"
                        : "text-[#5A554C]"
                    }`}
                  >
                    {activePackage.bestFor || "Short plan description."}
                  </p>

                  <div className="py-4 border-y border-current/15 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-normal">
                        {activePackage.priceFrom !== null &&
                        activePackage.priceFrom !== undefined
                          ? `${activePackage.currency === "USD" ? "$" : activePackage.currency} ${activePackage.priceFrom.toLocaleString()}`
                          : "Custom"}
                      </span>
                      {activePackage.priceFrom && (
                        <span
                          className={`text-xs font-mono ${
                            activePackage.isHighlighted
                              ? "text-white/60"
                              : "text-[#5A554C]"
                          }`}
                        >
                          / project
                        </span>
                      )}
                    </div>
                    {activePackage.priceNote && (
                      <span
                        className={`block text-[10px] font-mono mt-1 ${
                          activePackage.isHighlighted
                            ? "text-[#A2E391]"
                            : "text-[#3D9129]"
                        }`}
                      >
                        {activePackage.priceNote}
                      </span>
                    )}
                  </div>

                  {activePackage.features && activePackage.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {activePackage.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`text-xs flex items-start gap-2 ${
                            activePackage.isHighlighted
                              ? "text-white/90"
                              : "text-[#5A554C]"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              activePackage.isHighlighted
                                ? "text-[#A2E391]"
                                : "text-[#3D9129]"
                            }`}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div
                    className={`w-full py-2.5 rounded-full text-center text-xs font-semibold ${
                      activePackage.isHighlighted
                        ? "bg-[#3D9129] text-white"
                        : "bg-[#243629] text-white"
                    }`}
                  >
                    Select Plan
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-sm text-[#5A554C]">
                  Select or add a pricing card to view the live preview.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
