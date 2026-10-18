"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { getLandingData, updateLandingData, LandingPageData } from "@/lib/api";
import { SectionCard, fieldClass } from "../components";

export default function TestimonialsEditor() {
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
        setForm(data);
      })
      .catch((err) => {
        console.warn("[Admin] Failed to fetch landing data:", err);
        setError("Could not load landing page data.");
      })
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
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

      <SectionCard title="Testimonials">
        <div className="space-y-4">
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

      <div className="sticky bottom-0 flex justify-end border-t border-[#E2D9C6] bg-[#FAF6EC]/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#243629] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a281e] disabled:opacity-70"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving…" : "Save Changes"}</span>
        </button>
      </div>
    </div>
  );
}
