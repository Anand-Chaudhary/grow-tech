"use client";

import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import {
  getLandingData,
  updateLandingData,
  LandingPageData,
  ProjectItem,
  ServiceGridItem,
  ShowcaseCard,
} from "@/lib/api";

type EditableSection =
  | "hero"
  | "navigation"
  | "projectsSection"
  | "servicesSection"
  | "manifesto"
  | "contact"
  | "footer";

const fieldClass =
  "w-full p-2 bg-[#FAF6EC] border border-[#E2D9C6] rounded text-sm text-[#16130F]";
const labelClass = "block text-xs font-mono uppercase text-[#5A554C] mb-1";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  type?: string;
}

function TextField({ label, value, onChange, rows, type = "text" }: TextFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
      )}
    </label>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-[#E2D9C6] bg-white/50 p-5 sm:p-6">
      <h2 className="text-xl font-medium text-[#16130F]">{title}</h2>
      {children}
    </section>
  );
}

const emptyProject = (index: number): ProjectItem => ({
  id: `project-${Date.now()}-${index}`,
  number: String(index + 1).padStart(2, "0"),
  category: "",
  title: "",
  description: "",
  tags: [],
  client: "",
  metrics: "",
  accentBg: "#243629",
});

const emptyService = (index: number): ServiceGridItem => ({
  id: `service-${Date.now()}-${index}`,
  number: String(index + 1),
  title: "",
  description: "",
  details: [],
});

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
          projectsSection: {
            badge: data.projectsSection?.badge || "Oct 2024",
            heading: data.projectsSection?.heading || "Projects in motion.",
            liveCaseLabel: data.projectsSection?.liveCaseLabel || "LIVE CASE",
            statusLabel: data.projectsSection?.statusLabel || "Production",
            performanceLabel: data.projectsSection?.performanceLabel || "Performance Budget",
            performanceScore: data.projectsSection?.performanceScore || "100/100",
          },
          projects: data.projects,
          servicesSection: {
            heading: data.servicesSection?.heading || "What we do.",
          },
          services: data.services,
          manifesto: data.manifesto,
          contact: {
            ...data.contact,
            nameLabel: data.contact?.nameLabel || "Name",
            namePlaceholder: data.contact?.namePlaceholder || "Jane Doe",
            emailLabel: data.contact?.emailLabel || "Email",
            emailPlaceholder: data.contact?.emailPlaceholder || "jane@company.com",
            messageLabel: data.contact?.messageLabel || "Tell us about the project",
            messagePlaceholder: data.contact?.messagePlaceholder ||
              "What are you building, what is your timeframe, and what bottleneck are you solving?",
            submitLabel: data.contact?.submitLabel || "Send Inquiry",
            submittingLabel: data.contact?.submittingLabel || "Sending...",
            requiredFieldsMessage: data.contact?.requiredFieldsMessage || "Please fill out all required fields.",
            successHeading: data.contact?.successHeading || "Inquiry received.",
            successMessage: data.contact?.successMessage ||
              "Thank you for reaching out. We will review your project details and get back to you within 24 hours.",
            newInquiryLabel: data.contact?.newInquiryLabel || "Send another inquiry",
          },
          footer: {
            backToTop: data.footer?.backToTop || "Back to top",
            tagline: data.footer?.tagline || "Websites and apps built to grow with your business.",
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
    payload: Partial<NonNullable<LandingPageData[K]>>,
  ) => {
    setForm((previous) => ({
      ...previous,
      [section]: { ...(previous[section] ?? {}), ...payload },
    }));
    setSuccess(null);
  };

  const updateProject = (
    index: number,
    field: Exclude<keyof ProjectItem, "tags">,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      projects: (previous.projects ?? []).map((project, currentIndex) =>
        currentIndex === index ? { ...project, [field]: value } : project,
      ),
    }));
    setSuccess(null);
  };

  const updateProjectTags = (index: number, value: string) => {
    setForm((previous) => ({
      ...previous,
      projects: (previous.projects ?? []).map((project, currentIndex) =>
        currentIndex === index
          ? {
              ...project,
              tags: value.split("\n").map((tag) => tag.trim()).filter(Boolean),
            }
          : project,
      ),
    }));
    setSuccess(null);
  };

  const updateService = (
    index: number,
    field: Exclude<keyof ServiceGridItem, "details">,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      services: (previous.services ?? []).map((service, currentIndex) =>
        currentIndex === index ? { ...service, [field]: value } : service,
      ),
    }));
    setSuccess(null);
  };

  const updateServiceDetails = (index: number, value: string) => {
    setForm((previous) => ({
      ...previous,
      services: (previous.services ?? []).map((service, currentIndex) =>
        currentIndex === index
          ? {
              ...service,
              details: value.split("\n").map((detail) => detail.trim()).filter(Boolean),
            }
          : service,
      ),
    }));
    setSuccess(null);
  };

  const updateShowcaseCard = (
    index: number,
    field: keyof ShowcaseCard,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        marqueeCards: (previous.hero?.marqueeCards ?? []).map((card, currentIndex) =>
          currentIndex === index ? { ...card, [field]: value } : card,
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
      setSuccess(result.message);
    } else {
      setError(result.message);
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
  const projects = form.projects ?? [];
  const services = form.services ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-3xl font-serif text-[#16130F]">Landing Page Content</h1>
        <p className="mt-2 text-sm text-[#5A554C]">
          Edit the copy, labels, and content cards displayed across the public landing page.
        </p>
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

      {/* The UI for each section is omitted for brevity – you can navigate to dedicated pages */}
      <div className="sticky bottom-0 flex justify-end border-t border-[#E2D9C6] bg-[#FAF6EC]/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#243629] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a281e] disabled:opacity-70"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{saving ? "Saving…" : "Save Changes"}</span>
        </button>
      </div>
    </div>
  );
}

