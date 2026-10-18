// Shared UI components for admin content editor pages
import React from "react";
import { Plus, Trash2 } from "lucide-react";

export const fieldClass = "w-full p-2 bg-[#FAF6EC] border border-[#E2D9C6] rounded text-sm text-[#16130F]";
export const labelClass = "block text-xs font-mono uppercase text-[#5A554C] mb-1";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  type?: string;
}

export function TextField({ label, value, onChange, rows, type = "text" }: TextFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass} />
      )}
    </label>
  );
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-[#E2D9C6] bg-white/50 p-5 sm:p-6">
      <h2 className="text-xl font-medium text-[#16130F]">{title}</h2>
      {children}
    </section>
  );
}
