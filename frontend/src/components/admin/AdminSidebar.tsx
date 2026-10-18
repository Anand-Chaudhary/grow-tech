"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Layers,
  Briefcase,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  logoutAdmin,
  getAdminProfile,
  getStoredAdmin,
  getAdminLeads,
  AdminUser,
} from "@/lib/api";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export const DEFAULT_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Leads & Inquiries",
    href: "/admin/leads",
    icon: <Inbox className="w-4 h-4" />,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    label: "Projects & Work",
    href: "/admin/projects",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    label: "Pricing & Plans",
    href: "/admin/pricing",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    label: "Content & SEO",
    href: "/admin/content",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-4 h-4" />,
  },
];

export function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
  className = "",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [newLeadsCount, setNewLeadsCount] = useState<number | null>(null);

  useEffect(() => {
    // Only fetch auth profile if not on login page
    if (pathname === "/admin/login") return;

    const cached = getStoredAdmin();
    if (cached) {
      setAdminUser(cached);
    }

    getAdminProfile().then((profile) => {
      if (profile) {
        setAdminUser(profile);
      }
    });

    getAdminLeads()
      .then((res) => {
        if (res && res.data) {
          const unread = res.data.filter((l) => l.status === "NEW").length;
          setNewLeadsCount(unread || res.data.length);
        }
      })
      .catch(() => null);
  }, [pathname]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  const adminName = adminUser?.name || "Grow Tech Admin";
  const adminEmail = adminUser?.email || "admin@growtech.in";
  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navItems: AdminNavItem[] = DEFAULT_NAV_ITEMS.map((item) => {
    if (item.href === "/admin/leads") {
      return {
        ...item,
        badge:
          newLeadsCount !== null && newLeadsCount > 0
            ? String(newLeadsCount)
            : undefined,
      };
    }
    return item;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* 
        Sidebar Container:
        - Desktop: sticky top-0 h-screen max-h-screen w-64 shrink-0 (fits height, NEVER scrolls with page)
        - Mobile: fixed inset-y-0 left-0 z-50 h-screen max-h-screen w-64
      */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen max-h-screen shrink-0 bg-[#EFE8D8] border-r border-[#E2D9C6] flex flex-col justify-between overflow-hidden transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
      >
        {/* Top Header: Logo & Badge (Pinned, never scrolls) */}
        <div className="h-16 shrink-0 px-6 border-b border-[#E2D9C6] flex items-center justify-between bg-[#EFE8D8]">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src={logo} alt="Grow Tech" width={110} height={36} priority />
            <span className="text-[10px] font-mono uppercase tracking-wider bg-[#243629] text-white px-2 py-0.5 rounded">
              Admin
            </span>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-[#5A554C] hover:text-[#16130F] cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items (Scrollable internally ONLY if viewport is extremely short, sidebar stays fixed) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 overscroll-contain">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.12em] text-[#5A554C] font-semibold">
            Management
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#243629] text-white shadow-sm"
                    : "text-[#5A554C] hover:bg-[#FAF6EC] hover:text-[#16130F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? "text-white" : "text-[#5A554C]"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#243629]/10 text-[#243629]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section: View live website & User profile (Pinned to bottom, never scrolls) */}
        <div className="p-4 shrink-0 border-t border-[#E2D9C6] space-y-3 bg-[#EFE8D8]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#5A554C] hover:bg-[#FAF6EC] hover:text-[#16130F] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </span>
            <span className="text-[10px] font-mono text-[#3D9129]">growtech.in</span>
          </Link>

          {/* User Profile Card */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6EC] border border-[#E2D9C6]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#243629] text-white flex items-center justify-center text-xs font-mono font-semibold">
                {initials || "GT"}
              </div>
              <div className="max-w-[120px] truncate">
                <div className="text-xs font-semibold text-[#16130F] truncate">
                  {adminName}
                </div>
                <div className="text-[10px] text-[#5A554C] font-mono truncate">
                  {adminEmail}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-[#5A554C] hover:text-red-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
