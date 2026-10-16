"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { loginAdmin } from "@/lib/api";
import logo from "@/assets/logo.svg";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMessage("");

    const result = await loginAdmin({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EC] flex flex-col justify-between selection:bg-[#3D9129]/20 selection:text-[#243629]">
      {/* Top Header */}
      <header className="w-full px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="inline-flex items-center">
          <Image src={logo} alt="Grow Tech Logo" width={120} height={40} priority />
        </Link>
        <Link
          href="/"
          className="text-xs font-mono text-[#5A554C] hover:text-[#243629] transition-colors"
        >
          ← Back to website
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-[#E2D9C6] rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(36,54,41,0.04)]">
          {/* Card Header */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EFE8D8] text-[11px] font-mono text-[#243629] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3D9129]" />
              <span>Admin Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#16130F] font-normal tracking-[-0.02em]">
              Sign in to Grow Tech
            </h1>
            <p className="mt-2 text-sm text-[#5A554C] leading-relaxed">
              Enter your credentials to manage leads, services, and content.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-[0.1em] text-[#5A554C] mb-2 font-medium"
              >
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A554C]/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@growtech.in"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF6EC]/50 border border-[#E2D9C6] rounded-xl text-sm text-[#16130F] placeholder:text-stone-400 focus:outline-none focus:border-[#243629] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-mono uppercase tracking-[0.1em] text-[#5A554C] font-medium"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-[#3D9129] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A554C]/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF6EC]/50 border border-[#E2D9C6] rounded-xl text-sm text-[#16130F] placeholder:text-stone-400 focus:outline-none focus:border-[#243629] focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5A554C]/60 hover:text-[#16130F] cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E2D9C6] text-[#243629] focus:ring-0 cursor-pointer accent-[#243629]"
                />
                <span className="text-xs text-[#5A554C]">Remember this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#243629] hover:bg-[#1a281e] active:scale-[0.99] transition-all shadow-sm cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-[#E2D9C6]/60 text-center text-xs text-[#5A554C]/80">
            Protected by internal access token and TLS encryption.
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#5A554C]/70">
        © {new Date().getFullYear()} Grow Tech. Confidential & Proprietary.
      </footer>
    </div>
  );
}
