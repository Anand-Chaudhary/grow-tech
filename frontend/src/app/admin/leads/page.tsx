"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Inbox,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  Trash2,
  Mail,
  Globe,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  FileText,
  User,
} from "lucide-react";
import {
  getAdminLeads,
  updateAdminLead,
  deleteAdminLead,
  AdminLeadItem,
  LeadStatus,
} from "@/lib/api";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  NEW: {
    label: "New",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  CONTACTED: {
    label: "Contacted",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  QUALIFIED: {
    label: "Qualified",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  WON: {
    label: "Won",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
  },
  LOST: {
    label: "Lost",
    bg: "bg-gray-100",
    text: "text-gray-600",
    border: "border-gray-200",
  },
  SPAM: {
    label: "Spam",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

const DEFAULT_SAMPLE_LEADS: AdminLeadItem[] = [
  {
    id: "lead-sample-1",
    name: "Dr. Marcus Vance",
    email: "marcus@apexhealth.com",
    websiteUrl: "https://apexhealth.com",
    goal: "Need sub-second booking system and custom clinical routing architecture for 50k patient visits.",
    packageTier: "GROWTH",
    status: "NEW",
    consent: true,
    notes: "Requires HIPAA compliant hosting. Follow up by Tuesday.",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: "lead-sample-2",
    name: "Elena Rostova",
    email: "elena@terradesign.com",
    websiteUrl: "https://terradesign.com",
    goal: "Transforming 400-item PDF catalog into instant ordering portal with headless Shopify checkout.",
    packageTier: "SCALE",
    status: "QUALIFIED",
    consent: true,
    notes: "Budget approved for Q4 launch.",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "lead-sample-3",
    name: "Julian Mercer",
    email: "julian@beaconwealth.io",
    websiteUrl: "https://beaconwealth.io",
    goal: "Editorial website redesign with transparent fee calculator and interactive retirement planner.",
    packageTier: "GROWTH",
    status: "CONTACTED",
    consent: true,
    notes: "Initial consultation sent via email.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "lead-sample-4",
    name: "Sarah Jenkins",
    email: "sarah@lumina-studio.co",
    websiteUrl: "https://lumina-studio.co",
    goal: "Bespoke brand portfolio with Shopify checkout integration and 3D animation transitions.",
    packageTier: "LAUNCH",
    status: "CONTACTED",
    consent: true,
    notes: "Drafted project proposal.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<AdminLeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedTier, setSelectedTier] = useState<string>("ALL");

  // Lead Details Modal State
  const [activeLead, setActiveLead] = useState<AdminLeadItem | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchLeads = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    const result = await getAdminLeads({
      status: selectedStatus !== "ALL" ? selectedStatus : undefined,
      packageTier: selectedTier !== "ALL" ? selectedTier : undefined,
      q: searchQuery || undefined,
    });

    if (result && result.data && result.data.length > 0) {
      setLeads(result.data);
    } else {
      // Fallback to sample leads if offline or no backend data yet
      setLeads((prev) => (prev.length > 0 ? prev : DEFAULT_SAMPLE_LEADS));
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [selectedStatus, selectedTier]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(true);
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (activeLead && activeLead.id === leadId) {
      setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await updateAdminLead(leadId, { status: newStatus });
    if (!res.success) {
      setError(res.message);
    } else {
      setSuccess(`Lead status changed to ${newStatus}`);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    setSavingNotes(true);
    const res = await updateAdminLead(activeLead.id, { notes: notesDraft });
    setSavingNotes(false);
    if (res.success) {
      setActiveLead((prev) => (prev ? { ...prev, notes: notesDraft } : null));
      setLeads((prev) =>
        prev.map((l) => (l.id === activeLead.id ? { ...l, notes: notesDraft } : l))
      );
      setSuccess("Internal notes saved successfully.");
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.message);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) {
      return;
    }
    const res = await deleteAdminLead(leadId);
    if (res.success) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (activeLead && activeLead.id === leadId) {
        setActiveLead(null);
      }
      setSuccess("Lead deleted.");
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(res.message);
    }
  };

  // Filtered Leads in UI
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.goal.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "ALL" || lead.status === selectedStatus;

      const matchesTier =
        selectedTier === "ALL" || lead.packageTier === selectedTier;

      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [leads, searchQuery, selectedStatus, selectedTier]);

  // Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "NEW").length;
    const contacted = leads.filter((l) => l.status === "CONTACTED").length;
    const qualified = leads.filter((l) => l.status === "QUALIFIED").length;
    const won = leads.filter((l) => l.status === "WON").length;
    return { total, newCount, contacted, qualified, won };
  }, [leads]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E2D9C6]/60">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3D9129]/10 text-[#243629] text-xs font-mono font-medium mb-2">
            <Inbox className="w-3.5 h-3.5 text-[#3D9129]" />
            LEAD PIPELINE & INQUIRIES
          </div>
          <h1 className="text-3xl font-serif text-[#16130F]">Inbound Client Leads</h1>
          <p className="mt-1 text-sm text-[#5A554C]">
            Review, qualify, and manage client inquiries submitted through the frontend contact form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2D9C6] bg-white text-xs font-semibold text-[#16130F] hover:bg-[#FAF6EC] transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-[#3D9129] ${
                refreshing ? "animate-spin" : ""
              }`}
            />
            <span>Refresh</span>
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
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Inquiries", count: stats.total, color: "text-[#16130F]" },
          { label: "New (Unread)", count: stats.newCount, color: "text-emerald-600" },
          { label: "Contacted", count: stats.contacted, color: "text-blue-600" },
          { label: "Qualified", count: stats.qualified, color: "text-purple-600" },
          { label: "Won Deals", count: stats.won, color: "text-[#3D9129]" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#E2D9C6] bg-white p-5 shadow-sm"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-[#5A554C] block mb-1">
              {item.label}
            </span>
            <span className={`text-2xl font-serif font-medium ${item.color}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-[#E2D9C6] bg-white p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md"
          >
            <Search className="w-4 h-4 text-[#5A554C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name, email, or requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF6EC] border border-[#E2D9C6] rounded-full text-xs text-[#16130F] placeholder:text-[#5A554C]/70 focus:outline-none focus:ring-2 focus:ring-[#3D9129]/30 focus:border-[#3D9129]"
            />
          </form>

          {/* Package Tier Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#5A554C] uppercase">
              Tier:
            </span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="p-2 bg-[#FAF6EC] border border-[#E2D9C6] rounded-lg text-xs text-[#16130F] focus:outline-none"
            >
              <option value="ALL">All Tiers</option>
              <option value="LAUNCH">Launch</option>
              <option value="GROWTH">Growth</option>
              <option value="SCALE">Scale</option>
              <option value="NOT_SURE">Custom / Not Sure</option>
            </select>
          </div>
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-[#E2D9C6]/60">
          {(["ALL", "NEW", "CONTACTED", "QUALIFIED", "WON", "LOST", "SPAM"] as const).map(
            (statusKey) => {
              const isSelected = selectedStatus === statusKey;
              return (
                <button
                  key={statusKey}
                  type="button"
                  onClick={() => setSelectedStatus(statusKey)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-[#243629] text-white font-medium shadow-sm"
                      : "bg-[#FAF6EC] text-[#5A554C] hover:bg-[#E2D9C6]/50"
                  }`}
                >
                  {statusKey === "ALL" ? "All Inquiries" : statusKey}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Leads Table / List */}
      <div className="rounded-2xl border border-[#E2D9C6] bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-[#3D9129]" />
            <span className="ml-2 text-sm text-[#5A554C]">Loading inquiries...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-20 px-4">
            <Inbox className="w-10 h-10 text-[#5A554C]/40 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-[#16130F] mb-1">
              No matching inquiries found
            </h3>
            <p className="text-sm text-[#5A554C] max-w-sm mx-auto">
              Try adjusting your search query or filter tags to see all incoming submissions.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E2D9C6] bg-[#FAF6EC]/80 text-[#5A554C] font-mono text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-6 font-medium">Client / Contact</th>
                  <th className="py-3.5 px-6 font-medium">Inquiry / Goal</th>
                  <th className="py-3.5 px-6 font-medium">Package Tier</th>
                  <th className="py-3.5 px-6 font-medium">Status</th>
                  <th className="py-3.5 px-6 font-medium">Date</th>
                  <th className="py-3.5 px-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9C6]/60">
                {filteredLeads.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#FAF6EC]/40 transition-colors cursor-pointer group"
                      onClick={() => {
                        setActiveLead(lead);
                        setNotesDraft(lead.notes || "");
                      }}
                    >
                      {/* Name & Email */}
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#16130F] group-hover:text-[#3D9129] transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-xs text-[#5A554C] flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 text-[#3D9129]" />
                          <span>{lead.email}</span>
                        </div>
                        {lead.websiteUrl && (
                          <div className="text-xs text-[#5A554C] flex items-center gap-1 mt-0.5">
                            <Globe className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">
                              {lead.websiteUrl.replace(/^https?:\/\//, "")}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Goal / Project description */}
                      <td className="py-4 px-6 max-w-xs sm:max-w-md">
                        <p className="line-clamp-2 text-xs sm:text-sm text-[#16130F]">
                          {lead.goal}
                        </p>
                        {lead.notes && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#3D9129] font-medium mt-1">
                            <MessageSquare className="w-3 h-3" /> Has internal notes
                          </span>
                        )}
                      </td>

                      {/* Package Tier */}
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded font-mono text-xs font-semibold bg-[#FAF6EC] border border-[#E2D9C6] text-[#243629]">
                          {lead.packageTier || "NOT SURE"}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td
                        className="py-4 px-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as LeadStatus)
                          }
                          className={`text-xs font-medium rounded-full px-2.5 py-1 border transition-all focus:outline-none cursor-pointer ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="QUALIFIED">Qualified</option>
                          <option value="WON">Won</option>
                          <option value="LOST">Lost</option>
                          <option value="SPAM">Spam</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-[#5A554C] whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-6 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveLead(lead);
                              setNotesDraft(lead.notes || "");
                            }}
                            className="px-2.5 py-1 rounded text-xs text-[#243629] font-medium hover:bg-[#FAF6EC]"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete inquiry from ${lead.name}`}
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Details Inspection Drawer / Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E2D9C6] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E2D9C6]/60">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#3D9129] font-semibold block mb-1">
                  Inquiry Details
                </span>
                <h2 className="text-2xl font-serif text-[#16130F]">
                  {activeLead.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#5A554C] mt-1">
                  <a
                    href={`mailto:${activeLead.email}`}
                    className="hover:text-[#3D9129] flex items-center gap-1 underline underline-offset-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {activeLead.email}
                  </a>
                  {activeLead.websiteUrl && (
                    <a
                      href={activeLead.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3D9129] flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="p-2 rounded-full hover:bg-[#FAF6EC] text-[#5A554C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Tier Bar */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF6EC] border border-[#E2D9C6]/80 text-xs">
              <div>
                <span className="font-mono text-[#5A554C] uppercase text-[10px] block mb-1">
                  Lifecycle Status
                </span>
                <select
                  value={activeLead.status}
                  onChange={(e) =>
                    handleStatusChange(activeLead.id, e.target.value as LeadStatus)
                  }
                  className="font-medium p-1.5 rounded-lg border border-[#E2D9C6] bg-white text-[#16130F]"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="WON">Won</option>
                  <option value="LOST">Lost</option>
                  <option value="SPAM">Spam</option>
                </select>
              </div>

              <div>
                <span className="font-mono text-[#5A554C] uppercase text-[10px] block mb-1">
                  Target Service Tier
                </span>
                <span className="font-serif font-medium text-sm text-[#16130F]">
                  {activeLead.packageTier || "General Inquiry"}
                </span>
              </div>
            </div>

            {/* Client Inquiry / Goal Statement */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#5A554C] font-semibold">
                Project Scope & Requirements
              </h3>
              <div className="p-4 rounded-2xl border border-[#E2D9C6] bg-white text-sm text-[#16130F] leading-relaxed whitespace-pre-wrap">
                {activeLead.goal}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#5A554C] font-semibold">
                  Internal Notes & Next Steps
                </h3>
                <span className="text-[11px] text-[#5A554C]">
                  Visible only to admin team
                </span>
              </div>
              <textarea
                rows={3}
                value={notesDraft}
                placeholder="Log call summary, budget estimates, or follow-up deadlines..."
                onChange={(e) => setNotesDraft(e.target.value)}
                className="w-full p-3 bg-[#FAF6EC] border border-[#E2D9C6] rounded-xl text-sm text-[#16130F] focus:outline-none focus:ring-2 focus:ring-[#3D9129]/30"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#243629] hover:bg-[#1a281e] transition-colors disabled:opacity-50"
                >
                  {savingNotes ? "Saving Notes..." : "Save Notes"}
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E2D9C6]/60 text-xs">
              <span className="text-[#5A554C]">
                Received on:{" "}
                {new Date(activeLead.createdAt).toLocaleString("en-US")}
              </span>
              <a
                href={`mailto:${activeLead.email}?subject=Grow Tech Inquiry follow-up - ${activeLead.name}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3D9129] text-white font-semibold hover:bg-[#347d23] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
