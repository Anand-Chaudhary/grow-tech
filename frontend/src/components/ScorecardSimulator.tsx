"use client";

import React, { useState } from "react";
import { ArrowRight, RefreshCw, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export default function ScorecardSimulator() {
  const [testingUrl, setTestingUrl] = useState("");
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditCompleted, setAuditCompleted] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState<number | null>(null);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testingUrl.trim()) return;

    setAuditRunning(true);
    setAuditCompleted(false);

    setTimeout(() => {
      setAuditRunning(false);
      setAuditCompleted(true);
      const randomScore = Math.floor(Math.random() * 16) + 42;
      setSimulatedScore(randomScore);
    }, 1200);
  };

  return (
    <div className="rounded-[32px] border border-white/10 bg-[#0F1A12]/85 backdrop-blur-xl p-8 sm:p-14 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
        <div className="max-w-2xl">
          <div className="text-[13px] font-mono uppercase tracking-[0.16em] text-[#C8F169] mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Public Telemetry &amp; Verification</span>
          </div>
          <h3 className="text-[32px] sm:text-[44px] font-semibold text-[#F4FDF6] leading-[1.08] tracking-tight">
            We hold our own code to the public standard
          </h3>
          <p className="text-[17px] text-[#9BB3A2] mt-3 leading-relaxed">
            A web development company that ships a slow page loses the argument before the first scroll. Here is the verified lab telemetry for this website.
          </p>
        </div>

        {/* Global Score Badge */}
        <div className="flex items-center gap-4 bg-[#142318] px-6 py-4 rounded-[24px] border border-white/15 shrink-0 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#080E09] flex items-center justify-center font-mono font-bold text-[22px] text-[#C8F169] border border-[#C8F169]/40 shadow-sm">
            100
          </div>
          <div>
            <div className="font-semibold text-[16px] text-[#F4FDF6]">
              Passing all Core Web Vitals
            </div>
            <div className="text-[12px] text-[#C8F169] font-mono mt-0.5">
              Verified Lighthouse Lab Score
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-b border-white/10">
        <div className="rounded-[24px] border border-white/10 bg-[#142318]/70 p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-wider text-[#9BB3A2]">
              Largest Contentful Paint
            </div>
            <div className="text-[42px] font-bold text-[#C8F169] font-mono tracking-tight mt-2">
              0.8 <span className="text-[18px] font-normal text-[#9BB3A2]">s</span>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-white/10 text-[13px] text-[#9BB3A2] flex items-center justify-between">
            <span>Google: ≤ 2.5s</span>
            <span className="font-semibold text-[#C8F169] font-mono">Top 1% Speed</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#142318]/70 p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-wider text-[#9BB3A2]">
              Interaction to Next Paint
            </div>
            <div className="text-[42px] font-bold text-[#C8F169] font-mono tracking-tight mt-2">
              34 <span className="text-[18px] font-normal text-[#9BB3A2]">ms</span>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-white/10 text-[13px] text-[#9BB3A2] flex items-center justify-between">
            <span>Google: ≤ 200ms</span>
            <span className="font-semibold text-[#C8F169] font-mono">Instant Paint</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#142318]/70 p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-wider text-[#9BB3A2]">
              Cumulative Layout Shift
            </div>
            <div className="text-[42px] font-bold text-[#C8F169] font-mono tracking-tight mt-2">
              0.00
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-white/10 text-[13px] text-[#9BB3A2] flex items-center justify-between">
            <span>Google: ≤ 0.10</span>
            <span className="font-semibold text-[#C8F169] font-mono">Zero Shift</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#142318]/70 p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-wider text-[#9BB3A2]">
              Initial JS Payload
            </div>
            <div className="text-[42px] font-bold text-[#C8F169] font-mono tracking-tight mt-2">
              112 <span className="text-[18px] font-normal text-[#9BB3A2]">KB</span>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-white/10 text-[13px] text-[#9BB3A2] flex items-center justify-between">
            <span>Budget: &lt; 150KB</span>
            <span className="font-semibold text-[#C8F169] font-mono">Zero Bloat</span>
          </div>
        </div>
      </div>

      {/* Interactive Speed Diagnostic Tool */}
      <div className="pt-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#142318]/90 text-[#F4FDF6] rounded-[28px] p-8 sm:p-10 border border-white/10 shadow-md">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] text-[#C8F169] uppercase tracking-[0.16em]">
              Interactive Speed Diagnostic
            </span>
            <h4 className="text-[26px] sm:text-[30px] font-semibold text-[#F4FDF6] mt-2 leading-snug">
              How does your current website measure up?
            </h4>
            <p className="text-[15px] text-[#9BB3A2] mt-2 leading-relaxed">
              Every 1-second delay costs up to 16% in customer satisfaction and 7% in conversion. Test your domain to inspect potential mobile drag.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={testingUrl}
                onChange={(e) => setTestingUrl(e.target.value)}
                placeholder="yourdomain.com"
                className="flex-1 h-[52px] px-5 rounded-full bg-[#080E09] border border-white/15 text-[#F4FDF6] text-[14px] outline-none focus:border-[#C8F169] placeholder:text-[#9BB3A2]"
              />
              <button
                type="submit"
                disabled={auditRunning}
                className="btn-primary-leaf h-[52px] px-7 text-[14px] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
              >
                {auditRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {auditCompleted && simulatedScore !== null && (
              <div className="mt-4 p-5 rounded-2xl bg-[#080E09] border border-white/15 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#F4FDF6] font-medium">
                    Estimated Mobile Score for {testingUrl}
                  </span>
                  <span className="font-mono font-bold text-[#C8F169] text-[22px]">
                    {simulatedScore} / 100
                  </span>
                </div>
                <p className="text-[13px] text-[#9BB3A2] mt-2 leading-relaxed">
                  Diagnostic finding: Render-blocking scripts, uncompressed media, and unoptimized layout shifts delay first paint by over 3.6s. Book a free 20-min review for the complete prioritised fix checklist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
