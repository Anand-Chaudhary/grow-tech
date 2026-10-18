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

import { TextField, SectionCard } from "./components";

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
              tags: value
                .split("\n")
                .map((tag) => tag.trim())
                .filter(Boolean),
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
              details: value
                .split("\n")
                .map((detail) => detail.trim())
                .filter(Boolean),
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

      <SectionCard title="Navigation">
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["home", "Home link"],
              ["about", "About link"],
              ["services", "Services link"],
              ["portfolio", "Portfolio link"],
              ["clients", "Clients link"],
              ["contact", "Contact link"],
              ["action", "Navigation button"],
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

      <SectionCard title="Hero">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Headline"
            value={hero?.headline ?? ""}
            onChange={(headline) => updateSection("hero", { headline })}
          />
          <TextField
            label="Highlighted words"
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
            label="Primary button"
            value={hero?.actions?.primary ?? ""}
            onChange={(primary) =>
              updateSection("hero", {
                actions: { ...hero?.actions, primary },
              })
            }
          />
          <TextField
            label="Secondary button"
            value={hero?.actions?.secondary ?? ""}
            onChange={(secondary) =>
              updateSection("hero", {
                actions: { ...hero?.actions, secondary },
              })
            }
          />
        </div>

        <h3 className="pt-3 font-medium text-[#16130F]">Hero indicators</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {(["social", "scale", "launch"] as const).map((key) => (
            <div key={key} className="space-y-3 rounded-xl border border-[#E2D9C6] p-4">
              <TextField
                label={`${key} label`}
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
          <h3 className="font-medium text-[#16130F]">Marquee cards</h3>
          <button
            type="button"
            onClick={() =>
              updateSection("hero", {
                marqueeCards: [...marqueeCards, emptyShowcaseCard(marqueeCards.length)],
              })
            }
            className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
          >
            <Plus className="h-4 w-4" /> Add card
          </button>
        </div>
        <div className="space-y-4">
          {marqueeCards.map((card, index) => (
            <div key={card.id} className="space-y-3 rounded-xl border border-[#E2D9C6] p-4">
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
                  <span className={labelClass}>Visual style</span>
                  <select
                    value={card.variant}
                    onChange={(event) =>
                      updateShowcaseCard(index, "variant", event.target.value)
                    }
                    className={fieldClass}
                  >
                    {["analytics", "store", "system", "mobile", "editorial", "cloud"].map(
                      (variant) => (
                        <option key={variant} value={variant}>
                          {variant}
                        </option>
                      ),
                    )}
                  </select>
                </label>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Projects">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Section badge"
            value={form.projectsSection?.badge ?? ""}
            onChange={(badge) => updateSection("projectsSection", { badge })}
          />
          <TextField
            label="Section heading"
            value={form.projectsSection?.heading ?? ""}
            onChange={(heading) => updateSection("projectsSection", { heading })}
          />
          <TextField
            label="Case label"
            value={form.projectsSection?.liveCaseLabel ?? ""}
            onChange={(liveCaseLabel) =>
              updateSection("projectsSection", { liveCaseLabel })
            }
          />
          <TextField
            label="Status label"
            value={form.projectsSection?.statusLabel ?? ""}
            onChange={(statusLabel) => updateSection("projectsSection", { statusLabel })}
          />
          <TextField
            label="Performance label"
            value={form.projectsSection?.performanceLabel ?? ""}
            onChange={(performanceLabel) =>
              updateSection("projectsSection", { performanceLabel })
            }
          />
          <TextField
            label="Performance score"
            value={form.projectsSection?.performanceScore ?? ""}
            onChange={(performanceScore) =>
              updateSection("projectsSection", { performanceScore })
            }
          />
        </div>
        <div className="flex items-center justify-between pt-3">
          <h3 className="font-medium text-[#16130F]">Project cards</h3>
          <button
            type="button"
            onClick={() =>
              setForm((previous) => ({
                ...previous,
                projects: [...(previous.projects ?? []), emptyProject(projects.length)],
              }))
            }
            className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
          >
            <Plus className="h-4 w-4" /> Add project
          </button>
        </div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.id} className="space-y-3 rounded-xl border border-[#E2D9C6] p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#16130F]">Project {index + 1}</h4>
                <button
                  type="button"
                  aria-label={`Remove project ${index + 1}`}
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      projects: (previous.projects ?? []).filter(
                        (_, projectIndex) => projectIndex !== index,
                      ),
                    }))
                  }
                  className="rounded p-1 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["number", "Number"],
                    ["category", "Category"],
                    ["title", "Title"],
                    ["client", "Client"],
                    ["metrics", "Metrics"],
                    ["accentBg", "Card background color"],
                  ] as const
                ).map(([field, label]) => (
                  <TextField
                    key={field}
                    label={label}
                    value={project[field]}
                    onChange={(value) => updateProject(index, field, value)}
                  />
                ))}
                <div className="sm:col-span-2">
                  <TextField
                    label="Description"
                    rows={3}
                    value={project.description}
                    onChange={(value) => updateProject(index, "description", value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextField
                    label="Tags (one per line)"
                    rows={3}
                    value={project.tags.join("\n")}
                    onChange={(value) => updateProjectTags(index, value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Services">
        <TextField
          label="Section heading"
          value={form.servicesSection?.heading ?? ""}
          onChange={(heading) => updateSection("servicesSection", { heading })}
        />
        <div className="flex items-center justify-between pt-3">
          <h3 className="font-medium text-[#16130F]">Service cards</h3>
          <button
            type="button"
            onClick={() =>
              setForm((previous) => ({
                ...previous,
                services: [...(previous.services ?? []), emptyService(services.length)],
              }))
            }
            className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
          >
            <Plus className="h-4 w-4" /> Add service
          </button>
        </div>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={service.id || index} className="space-y-3 rounded-xl border border-[#E2D9C6] p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[#16130F]">Service {index + 1}</h4>
                <button
                  type="button"
                  aria-label={`Remove service ${index + 1}`}
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      services: (previous.services ?? []).filter(
                        (_, serviceIndex) => serviceIndex !== index,
                      ),
                    }))
                  }
                  className="rounded p-1 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Number"
                  value={service.number}
                  onChange={(value) => updateService(index, "number", value)}
                />
                <TextField
                  label="Title"
                  value={service.title}
                  onChange={(value) => updateService(index, "title", value)}
                />
                <div className="sm:col-span-2">
                  <TextField
                    label="Description"
                    rows={3}
                    value={service.description}
                    onChange={(value) => updateService(index, "description", value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextField
                    label="Details (one per line)"
                    rows={3}
                    value={service.details.join("\n")}
                    onChange={(value) => updateServiceDetails(index, value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="About / Manifesto">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Heading"
            value={form.manifesto?.heading ?? ""}
            onChange={(heading) => updateSection("manifesto", { heading })}
          />
          <TextField
            label="Highlighted text"
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

      <SectionCard title="Contact">
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
            label="Highlighted text"
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
              ["submitLabel", "Submit button"],
              ["submittingLabel", "Submitting button"],
              ["requiredFieldsMessage", "Required fields error"],
              ["successHeading", "Success heading"],
              ["successMessage", "Success message"],
              ["newInquiryLabel", "Send another inquiry button"],
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

      <SectionCard title="Footer">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Back to top label"
            value={form.footer?.backToTop ?? ""}
            onChange={(backToTop) => updateSection("footer", { backToTop })}
          />
          <TextField
            label="Copyright tagline"
            value={form.footer?.tagline ?? ""}
            onChange={(tagline) => updateSection("footer", { tagline })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Footer value labels (one per line)"
              rows={2}
              value={form.footer?.valueProps?.join("\n") ?? ""}
              onChange={(value) =>
                updateSection("footer", {
                  valueProps: value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        </div>
      </SectionCard>


<SectionCard title="Case Studies">
  <div className="space-y-4">
    {(form.caseStudies ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                caseStudies: (prev.caseStudies ?? []).map((c, i) => (i === idx ? parsed : c)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              caseStudies: (prev.caseStudies ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          caseStudies: [...(prev.caseStudies ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add case study
    </button>
  </div>
</SectionCard>

<SectionCard title="Packages">
  <div className="space-y-4">
    {(form.packages ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                packages: (prev.packages ?? []).map((p, i) => (i === idx ? parsed : p)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              packages: (prev.packages ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          packages: [...(prev.packages ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add package
    </button>
  </div>
</SectionCard>

<SectionCard title="FAQs">
  <div className="space-y-4">
    {(form.faqs ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                faqs: (prev.faqs ?? []).map((f, i) => (i === idx ? parsed : f)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              faqs: (prev.faqs ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          faqs: [...(prev.faqs ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add FAQ
    </button>
  </div>
</SectionCard>
  {/* duplicate block start
    {(form.testimonials ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                testimonials: (prev.testimonials ?? []).map((t, i) => (i === idx ? parsed : t)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              testimonials: (prev.testimonials ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          testimonials: [...(prev.testimonials ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add testimonial
    </button>
  </div>
</SectionCard>

<SectionCard title="Case Studies">
  <div className="space-y-4">
    {(form.caseStudies ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                caseStudies: (prev.caseStudies ?? []).map((c, i) => (i === idx ? parsed : c)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              caseStudies: (prev.caseStudies ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          caseStudies: [...(prev.caseStudies ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add case study
    </button>
  </div>
</SectionCard>

<SectionCard title="Packages">
  <div className="space-y-4">
    {(form.packages ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                packages: (prev.packages ?? []).map((p, i) => (i === idx ? parsed : p)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              packages: (prev.packages ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          packages: [...(prev.packages ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add package
    </button>
  </div>
</SectionCard>

<SectionCard title="FAQs">
  <div className="space-y-4">
    {(form.faqs ?? []).map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <textarea
          rows={3}
          className={fieldClass}
          value={JSON.stringify(item, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setForm((prev) => ({
                ...prev,
                faqs: (prev.faqs ?? []).map((f, i) => (i === idx ? parsed : f)),
              }));
            } catch {}
          }}
        />
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              faqs: (prev.faqs ?? []).filter((_, i) => i !== idx),
            }))
          }
          className="p-1 text-red-700 hover:bg-red-50 rounded"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          faqs: [...(prev.faqs ?? []), {}],
        }))
      }
      className="inline-flex items-center gap-1 text-sm font-medium text-[#243629]"
    >
      <Plus className="h-4 w-4" /> Add FAQ
    </button>
  </div>
</SectionCard>
*/}
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
