"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  getLandingData,
  updateLandingData,
  ProjectItem,
  ProjectsSectionData,
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

const emptyProject = (index: number): ProjectItem => ({
  id: `project-${Date.now()}-${index}`,
  number: String(index + 1).padStart(2, "0"),
  category: "Web Application",
  title: "",
  description: "",
  tags: ["Next.js", "Tailwind CSS", "TypeScript"],
  client: "",
  metrics: "99/100 Core Web Vitals",
  accentBg: "#243629",
});

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [sectionData, setSectionData] = useState<ProjectsSectionData>({
    badge: "Case Studies",
    heading: "Projects in motion.",
    liveCaseLabel: "LIVE CASE",
    statusLabel: "Production",
    performanceLabel: "Performance Budget",
    performanceScore: "100/100",
  });

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(0);

  useEffect(() => {
    getLandingData()
      .then((data) => {
        if (!data) {
          setError("Could not load projects data from server.");
          return;
        }
        if (data.projectsSection) {
          setSectionData({
            badge: data.projectsSection.badge || "Case Studies",
            heading: data.projectsSection.heading || "Projects in motion.",
            liveCaseLabel: data.projectsSection.liveCaseLabel || "LIVE CASE",
            statusLabel: data.projectsSection.statusLabel || "Production",
            performanceLabel:
              data.projectsSection.performanceLabel || "Performance Budget",
            performanceScore:
              data.projectsSection.performanceScore || "100/100",
          });
        }
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        } else {
          setProjects([
            {
              id: "project-1",
              number: "01",
              category: "B2B SaaS Platform",
              title: "Clinical Care Workflow & Real-Time Booking Engine",
              description:
                "Architecture overhaul reducing initial page load from 4.2s to 0.4s, handling 50k daily active patient appointments.",
              tags: ["Next.js 15", "TailwindCSS", "Edge Caching", "HIPAA Ready"],
              client: "Apex Health Group",
              metrics: "0.4s LCP • 99.98% Uptime",
              accentBg: "#243629",
            },
            {
              id: "project-2",
              number: "02",
              category: "Headless E-Commerce",
              title: "Artisanal Furniture Direct-To-Consumer Portal",
              description:
                "Custom Shopify storefront with 3D product previews and localized multi-currency checkout achieving +42% mobile conversion.",
              tags: ["Shopify Storefront", "Next.js", "Three.js", "Stripe"],
              client: "Terra Living Atelier",
              metrics: "+42% Checkout Conversion",
              accentBg: "#1F2E23",
            },
          ]);
        }
      })
      .catch((err) => {
        console.warn("[Admin Projects] Error loading data:", err);
        setError("Could not connect to backend server.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateProject = (
    index: number,
    field: Exclude<keyof ProjectItem, "tags">,
    value: string
  ) => {
    setProjects((prev) =>
      prev.map((proj, i) => (i === index ? { ...proj, [field]: value } : proj))
    );
    setSuccess(null);
  };

  const handleUpdateTags = (index: number, text: string) => {
    const tags = text
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
    setProjects((prev) =>
      prev.map((proj, i) => (i === index ? { ...proj, tags } : proj))
    );
    setSuccess(null);
  };

  const handleAddProject = () => {
    const newProj = emptyProject(projects.length);
    setProjects((prev) => [...prev, newProj]);
    setActivePreviewIndex(projects.length);
    setSuccess(null);
  };

  const handleRemoveProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
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
      projectsSection: sectionData,
      projects,
    };

    const res = await updateLandingData(payload as any);
    setSaving(false);
    if (res.success) {
      setSuccess("Projects updated successfully! Changes are live on the site.");
    } else {
      setError(res.message || "Failed to update projects.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[#3D9129]" />
        <span className="ml-2 text-sm text-[#5A554C]">Loading projects...</span>
      </div>
    );
  }

  const activeProject =
    activePreviewIndex !== null ? projects[activePreviewIndex] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E2D9C6]/60">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-2">
            <Briefcase className="w-3.5 h-3.5 text-[#3D9129]" />
            PROJECTS & PORTFOLIO
          </div>
          <h1 className="text-3xl font-serif text-[#16130F]">Work & Case Studies</h1>
          <p className="mt-1 text-sm text-[#5A554C]">
            Curate live case studies, client results, and technical metric showcases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E2D9C6] bg-white text-xs font-semibold text-[#16130F] hover:bg-[#FAF6EC] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#3D9129]" />
            Add Project
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

      {/* Projects Section Header Meta Settings */}
      <div className="rounded-2xl border border-[#E2D9C6] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-serif text-[#16130F] mb-4">
          Section Metadata & Performance Badges
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField
            label="Section Badge"
            value={sectionData.badge || ""}
            placeholder="e.g. Case Studies"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, badge: val }))
            }
          />
          <TextField
            label="Section Heading"
            value={sectionData.heading || ""}
            placeholder="Projects in motion."
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, heading: val }))
            }
          />
          <TextField
            label="Live Status Label"
            value={sectionData.statusLabel || ""}
            placeholder="Production"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, statusLabel: val }))
            }
          />
          <TextField
            label="Live Case Tag"
            value={sectionData.liveCaseLabel || ""}
            placeholder="LIVE CASE"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, liveCaseLabel: val }))
            }
          />
          <TextField
            label="Performance Budget Label"
            value={sectionData.performanceLabel || ""}
            placeholder="Performance Budget"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, performanceLabel: val }))
            }
          />
          <TextField
            label="Performance Score"
            value={sectionData.performanceScore || ""}
            placeholder="100/100"
            onChange={(val) =>
              setSectionData((prev) => ({ ...prev, performanceScore: val }))
            }
          />
        </div>
      </div>

      {/* Project Cards and Live Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-[#16130F]">
            Project Cards ({projects.length})
          </h2>
          <span className="text-xs text-[#5A554C]">
            Detailed case cards with client metrics, category, and tech stack tags.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Projects Form Cards */}
          <div className="lg:col-span-7 space-y-6">
            {projects.map((proj, index) => (
              <div
                key={proj.id || index}
                className="rounded-2xl border border-[#E2D9C6] bg-white p-6 shadow-sm hover:border-[#3D9129]/40 transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E2D9C6]/60">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FAF6EC] font-mono text-xs font-bold text-[#3D9129] border border-[#E2D9C6]">
                      {proj.number || index + 1}
                    </span>
                    <span className="font-serif font-medium text-[#16130F]">
                      {proj.title || `Project ${index + 1}`}
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
                      aria-label={`Remove project ${index + 1}`}
                      onClick={() => handleRemoveProject(index)}
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Index / Number (e.g. 01, 02)"
                    value={proj.number}
                    placeholder="01"
                    onChange={(val) => handleUpdateProject(index, "number", val)}
                  />
                  <TextField
                    label="Category"
                    value={proj.category}
                    placeholder="e.g. B2B SaaS Platform"
                    onChange={(val) => handleUpdateProject(index, "category", val)}
                  />
                  <TextField
                    label="Project Title"
                    value={proj.title}
                    placeholder="e.g. Clinical Care Booking Engine"
                    onChange={(val) => handleUpdateProject(index, "title", val)}
                  />
                  <TextField
                    label="Client Name"
                    value={proj.client}
                    placeholder="e.g. Apex Health Group"
                    onChange={(val) => handleUpdateProject(index, "client", val)}
                  />
                  <TextField
                    label="Metrics Highlight"
                    value={proj.metrics}
                    placeholder="e.g. 0.4s LCP • 99.98% Uptime"
                    onChange={(val) => handleUpdateProject(index, "metrics", val)}
                  />
                  <TextField
                    label="Card Background Color (Hex)"
                    value={proj.accentBg}
                    placeholder="#243629"
                    onChange={(val) => handleUpdateProject(index, "accentBg", val)}
                  />
                  <div className="sm:col-span-2">
                    <TextField
                      label="Case Description / Impact"
                      rows={3}
                      value={proj.description}
                      placeholder="Outline the architectural problem, solution delivered, and business impact..."
                      onChange={(val) =>
                        handleUpdateProject(index, "description", val)
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      label="Technology Tags (one per line)"
                      rows={3}
                      value={proj.tags?.join("\n") || ""}
                      placeholder="Next.js 15&#10;TailwindCSS&#10;Edge Caching"
                      onChange={(val) => handleUpdateTags(index, val)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-[#E2D9C6] rounded-2xl bg-white/50">
                <p className="text-sm text-[#5A554C] mb-4">No projects added yet.</p>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#243629]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add First Project
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
                  {activeProject ? `Item ${activePreviewIndex! + 1}` : "No selection"}
                </span>
              </div>

              {activeProject ? (
                <div
                  className="rounded-2xl p-6 sm:p-8 text-white transition-all shadow-md relative overflow-hidden"
                  style={{ backgroundColor: activeProject.accentBg || "#243629" }}
                >
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between text-xs text-white/70 font-mono mb-4 border-b border-white/10 pb-3">
                    <span className="uppercase tracking-wider">
                      {activeProject.category || "Case Study"}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px]">
                      {activeProject.number || "01"}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-2 leading-snug">
                    {activeProject.title || "Project Title"}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 font-light">
                    {activeProject.description || "Project summary description."}
                  </p>

                  {/* Client & Metrics */}
                  <div className="grid grid-cols-2 gap-3 py-3 mb-4 rounded-xl bg-black/20 px-3 text-xs">
                    <div>
                      <span className="text-white/50 block text-[10px] font-mono uppercase">
                        Client
                      </span>
                      <span className="text-white font-medium">
                        {activeProject.client || "Client Name"}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] font-mono uppercase">
                        Results
                      </span>
                      <span className="text-[#A2E391] font-medium">
                        {activeProject.metrics || "Impact metrics"}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {activeProject.tags && activeProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeProject.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-white/10 text-white/90 text-[11px] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-sm text-[#5A554C]">
                  Select or add a project card to view the live preview.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
