"use client";

import React, { useEffect, useState } from "react";
import {
  Layers,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Sparkles,
} from "lucide-react";
import {
  getLandingData,
  updateLandingData,
  ServiceGridItem,
  ServicesSectionData,
} from "@/lib/api";

const fieldClass =
  "w-full p-2.5 bg-[#FAF6EC] border border-[#E2D9C6] rounded-lg text-sm text-[#16130F] focus:outline-none focus:ring-2 focus:ring-[#3D9129]/30 focus:border-[#3D9129] transition-all";
const labelClass = "block text-xs font-mono uppercase tracking-wider text-[#5A554C] mb-1.5 font-medium";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

function TextField({
  label,
  value,
  onChange,
  rows,
  placeholder,
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
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      )}
    </label>
  );
}

const emptyService = (index: number): ServiceGridItem => ({
  id: `service-${Date.now()}-${index}`,
  number: String(index + 1).padStart(2, "0"),
  title: "",
  description: "",
  details: [],
});

export default function AdminServicesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [sectionHeading, setSectionHeading] = useState("What we do.");
  const [services, setServices] = useState<ServiceGridItem[]>([]);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(0);

  useEffect(() => {
    getLandingData()
      .then((data) => {
        if (!data) {
          setError("Could not load services data from server.");
          return;
        }
        if (data.servicesSection?.heading) {
          setSectionHeading(data.servicesSection.heading);
        }
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        } else {
          setServices([
            {
              id: "service-1",
              number: "01",
              title: "High-Performance Next.js Engineering",
              description: "Custom web applications optimized for sub-second page loads, Lighthouse 95+ scores, and enterprise reliability.",
              details: [
                "Full-stack React & Next.js App Router",
                "Sub-second Largest Contentful Paint (LCP)",
                "Zero bloated dependencies",
              ],
            },
            {
              id: "service-2",
              number: "02",
              title: "E-Commerce & High-Converting Funnels",
              description: "Frictionless checkout architectures with Shopify, Stripe, and bespoke headless solutions designed to maximize conversions.",
              details: [
                "Streamlined 1-step checkout flows",
                "Instant search & multi-currency support",
                "Zero third-party script slowdowns",
              ],
            },
          ]);
        }
      })
      .catch((err) => {
        console.warn("[Admin Services] Error loading data:", err);
        setError("Could not connect to backend server.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateService = (
    index: number,
    field: Exclude<keyof ServiceGridItem, "details">,
    value: string
  ) => {
    setServices((prev) =>
      prev.map((svc, i) => (i === index ? { ...svc, [field]: value } : svc))
    );
    setSuccess(null);
  };

  const handleUpdateDetails = (index: number, text: string) => {
    const list = text
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    setServices((prev) =>
      prev.map((svc, i) => (i === index ? { ...svc, details: list } : svc))
    );
    setSuccess(null);
  };

  const handleAddService = () => {
    const newSvc = emptyService(services.length);
    setServices((prev) => [...prev, newSvc]);
    setActivePreviewIndex(services.length);
    setSuccess(null);
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
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
      servicesSection: { heading: sectionHeading },
      services,
    };

    const res = await updateLandingData(payload as any);
    setSaving(false);
    if (res.success) {
      setSuccess("Services updated successfully! Changes are live on the site.");
    } else {
      setError(res.message || "Failed to update services.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[#3D9129]" />
        <span className="ml-2 text-sm text-[#5A554C]">Loading services...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E2D9C6]/60">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-2">
            <Layers className="w-3.5 h-3.5 text-[#3D9129]" />
            SERVICES MANAGEMENT
          </div>
          <h1 className="text-3xl font-serif text-[#16130F]">Services Offerings</h1>
          <p className="mt-1 text-sm text-[#5A554C]">
            Manage the core capabilities, deliverables, and service cards displayed on the public site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2D9C6] bg-white text-xs font-semibold text-[#16130F] hover:bg-[#FAF6EC] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#3D9129]" />
            Add Service
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#243629] hover:bg-[#1a281e] transition-colors shadow-sm disabled:opacity-50"
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

      {/* Section Global Settings */}
      <div className="rounded-2xl border border-[#E2D9C6] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-serif text-[#16130F] mb-4">Section Headline</h2>
        <div className="max-w-md">
          <TextField
            label="Section Heading"
            value={sectionHeading}
            placeholder="What we do."
            onChange={setSectionHeading}
          />
        </div>
      </div>

      {/* Services List and Live Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-[#16130F]">
            Service Cards ({services.length})
          </h2>
          <span className="text-xs text-[#5A554C]">
            Each card appears in the 2x2 grid on the homepage and dedicated services page.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Services Form Cards */}
          <div className="lg:col-span-7 space-y-6">
            {services.map((svc, index) => (
              <div
                key={svc.id || index}
                className="rounded-2xl border border-[#E2D9C6] bg-white p-6 shadow-sm hover:border-[#3D9129]/40 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E2D9C6]/60">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF6EC] font-mono text-xs font-bold text-[#3D9129] border border-[#E2D9C6]">
                      {svc.number || index + 1}
                    </span>
                    <span className="font-serif font-medium text-[#16130F]">
                      {svc.title || `Service ${index + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePreviewIndex(index)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                        activePreviewIndex === index
                          ? "bg-[#3D9129]/10 text-[#243629] font-medium"
                          : "text-[#5A554C] hover:bg-[#FAF6EC]"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>

                    <button
                      type="button"
                      aria-label={`Remove service ${index + 1}`}
                      onClick={() => handleRemoveService(index)}
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Number Badge (e.g. 01, 02)"
                    value={svc.number}
                    placeholder="01"
                    onChange={(val) => handleUpdateService(index, "number", val)}
                  />
                  <TextField
                    label="Service Title"
                    value={svc.title}
                    placeholder="e.g. Custom Web Engineering"
                    onChange={(val) => handleUpdateService(index, "title", val)}
                  />
                  <div className="sm:col-span-2">
                    <TextField
                      label="Short Overview / Value Proposition"
                      rows={2}
                      value={svc.description}
                      placeholder="Explain what problem this solves for clients..."
                      onChange={(val) => handleUpdateService(index, "description", val)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      label="Key Deliverables (one item per line)"
                      rows={3}
                      value={svc.details?.join("\n") || ""}
                      placeholder="Deliverable item 1&#10;Deliverable item 2&#10;Deliverable item 3"
                      onChange={(val) => handleUpdateDetails(index, val)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {services.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-[#E2D9C6] rounded-2xl bg-white/50">
                <p className="text-sm text-[#5A554C] mb-4">No services defined yet.</p>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#243629]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add First Service
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
                  Live Preview
                </div>
                <span className="text-xs text-[#5A554C]">
                  {activePreviewIndex !== null && services[activePreviewIndex]
                    ? `Item ${activePreviewIndex + 1}`
                    : "No selection"}
                </span>
              </div>

              {activePreviewIndex !== null && services[activePreviewIndex] ? (
                <div className="p-8 rounded-2xl border border-[#E2D9C6] bg-white transition-all shadow-sm">
                  <span className="font-serif text-3xl sm:text-4xl text-[#3D9129] font-light block mb-4">
                    {services[activePreviewIndex].number || "01"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#16130F] mb-3 leading-snug">
                    {services[activePreviewIndex].title || "Service Title Here"}
                  </h3>
                  <p className="text-sm text-[#5A554C] leading-relaxed mb-6">
                    {services[activePreviewIndex].description ||
                      "Short description describing the offering and strategic business impact."}
                  </p>
                  {services[activePreviewIndex].details &&
                    services[activePreviewIndex].details.length > 0 && (
                      <ul className="space-y-2.5 pt-4 border-t border-[#E2D9C6]/60">
                        {services[activePreviewIndex].details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-[#5A554C] flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3D9129] mt-1.5 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ) : (
                <div className="p-12 text-center text-sm text-[#5A554C]">
                  Select or add a service card to see the live rendering.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
