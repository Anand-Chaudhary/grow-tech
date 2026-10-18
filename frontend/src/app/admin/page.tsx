"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Clock,
  Layers,
  Zap,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  MoreVertical,
  Plus,
  Briefcase,
  DollarSign,
  FileText,
  Loader2,
} from "lucide-react";
import {
  getAdminLeads,
  getLandingData,
  AdminLeadItem,
  LandingPageData,
} from "@/lib/api";

const DEFAULT_LEADS: AdminLeadItem[] = [
  {
    id: "lead-1",
    name: "Dr. Marcus Vance",
    email: "marcus@apexhealth.com",
    goal: "Need sub-second booking system and custom clinical routing.",
    packageTier: "GROWTH",
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "lead-2",
    name: "Elena Rostova",
    email: "elena@terradesign.com",
    goal: "Transforming 400-item PDF catalog into instant ordering portal.",
    packageTier: "SCALE",
    status: "QUALIFIED",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "lead-3",
    name: "Julian Mercer",
    email: "julian@beaconwealth.io",
    goal: "Editorial website redesign with transparent fee calculator.",
    packageTier: "GROWTH",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "lead-4",
    name: "Sarah Jenkins",
    email: "sarah@lumina-studio.co",
    goal: "Bespoke brand portfolio with Shopify checkout integration.",
    packageTier: "LAUNCH",
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<AdminLeadItem[]>(DEFAULT_LEADS);
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminLeads().catch(() => null),
      getLandingData().catch(() => null),
    ])
      .then(([leadsRes, landingRes]) => {
        if (leadsRes && leadsRes.data && leadsRes.data.length > 0) {
          setLeads(leadsRes.data);
        }
        if (landingRes) {
          setLandingData(landingRes);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalLeads = leads.length;
  const pendingReviews = leads.filter(
    (l) => l.status === "NEW" || l.status === "CONTACTED"
  ).length;
  const activeServices = landingData?.services?.length || 4;
  const performanceScore =
    landingData?.projectsSection?.performanceScore || "99/100";

  const STATS = [
    {
      title: "Total Inquiries",
      value: String(totalLeads),
      change: `${leads.filter((l) => l.status === "NEW").length} new inquiries`,
      subtext: "Site review form submissions",
      icon: <Inbox className="w-4 h-4 text-[#243629]" />,
    },
    {
      title: "Pending Reviews",
      value: String(pendingReviews),
      change: "Requires response",
      subtext: "Within 24h SLA target",
      icon: <Clock className="w-4 h-4 text-[#F9AD1B]" />,
    },
    {
      title: "Active Services",
      value: String(activeServices),
      change: "Configured offerings",
      subtext: "Published on landing page",
      icon: <Layers className="w-4 h-4 text-[#3D9129]" />,
    },
    {
      title: "Performance Score",
      value: performanceScore,
      change: "0.4s avg LCP",
      subtext: "Google Core Web Vitals",
      icon: <Zap className="w-4 h-4 text-[#243629]" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2D9C6]/60">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#16130F] font-normal tracking-[-0.02em]">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-[#5A554C]">
            Monitor inbound client inquiries, published services, and site performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#243629] hover:bg-[#1a281e] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage All Leads</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/80 border border-[#E2D9C6] rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(36,54,41,0.02)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5A554C] font-medium">
                {stat.title}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FAF6EC] border border-[#E2D9C6] flex items-center justify-center">
                {stat.icon}
              </div>
            </div>

            <div>
              <div className="font-serif text-3xl sm:text-4xl text-[#16130F] mb-1">
                {stat.value}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#3D9129]">{stat.change}</span>
                <span className="text-[#5A554C]/70">·</span>
                <span className="text-[#5A554C]/80">{stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Inquiries Table (8 cols) */}
        <div className="lg:col-span-8 bg-white/80 border border-[#E2D9C6] rounded-2xl p-6 shadow-[0_2px_12px_rgba(36,54,41,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2D9C6]/60 mb-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#16130F]">
                Recent Inquiries
              </h2>
              <p className="text-xs text-[#5A554C]">
                Latest submissions from the frontend contact form
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono text-[#3D9129] hover:underline flex items-center gap-1 font-medium"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2D9C6] text-[10px] font-mono uppercase tracking-wider text-[#5A554C]">
                  <th className="py-3 px-2">Prospect</th>
                  <th className="py-3 px-2">Project Goal</th>
                  <th className="py-3 px-2">Tier</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9C6]/40">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF6EC]/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="font-semibold text-[#16130F]">{lead.name}</div>
                      <div className="text-[11px] text-[#5A554C] font-mono">{lead.email}</div>
                    </td>
                    <td className="py-3 px-2 max-w-[220px] truncate text-[#5A554C]">
                      {lead.goal}
                    </td>
                    <td className="py-3 px-2 font-mono text-[11px] text-[#243629]">
                      {lead.packageTier || "General"}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          lead.status === "NEW"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : lead.status === "QUALIFIED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-stone-100 text-stone-700 border border-stone-200"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[11px] font-mono text-[#5A554C] text-right">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Management & Shortcuts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Management Panel */}
          <div className="bg-white/80 border border-[#E2D9C6] rounded-2xl p-6 shadow-[0_2px_12px_rgba(36,54,41,0.02)]">
            <h3 className="font-serif text-lg text-[#16130F] mb-3">
              Management Modules
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EC] hover:bg-[#EFE8D8] border border-[#E2D9C6]/60 text-xs font-medium text-[#16130F] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#3D9129]" />
                  <span>Services Offerings</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5A554C]" />
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EC] hover:bg-[#EFE8D8] border border-[#E2D9C6]/60 text-xs font-medium text-[#16130F] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#243629]" />
                  <span>Projects & Work</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5A554C]" />
              </Link>

              <Link
                href="/admin/pricing"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EC] hover:bg-[#EFE8D8] border border-[#E2D9C6]/60 text-xs font-medium text-[#16130F] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-[#3D9129]" />
                  <span>Pricing & Plans</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5A554C]" />
              </Link>

              <Link
                href="/admin/leads"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EC] hover:bg-[#EFE8D8] border border-[#E2D9C6]/60 text-xs font-medium text-[#16130F] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 text-[#F9AD1B]" />
                  <span>Leads & Pipeline</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5A554C]" />
              </Link>

              <Link
                href="/admin/content"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EC] hover:bg-[#EFE8D8] border border-[#E2D9C6]/60 text-xs font-medium text-[#16130F] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#3D9129]" />
                  <span>Content, Hero & SEO</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5A554C]" />
              </Link>
            </div>
          </div>

          {/* SLA Performance Card */}
          <div className="rounded-2xl border border-[#E2D9C6] bg-[#243629] p-6 text-white shadow-sm space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A2E391]">
              Performance Status
            </span>
            <h4 className="font-serif text-xl font-normal">
              Sub-Second Speed Target
            </h4>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Frontend production build is configured with Next.js App Router, edge caching, and optimized font loading for zero layout shift.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-white/60 border-t border-white/10">
              <span>LCP Target</span>
              <span className="text-[#A2E391] font-bold">&lt; 0.8s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
