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
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Menu,
  X,
  Bell,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  logoutAdmin,
  getAdminProfile,
  getStoredAdmin,
  AdminUser,
} from "@/lib/api";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Leads & Inquiries",
    href: "/admin/leads",
    icon: <Inbox className="w-4 h-4" />,
    badge: "5",
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

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
  }, [pathname]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
  };

  // If this is the login route inside admin, don't wrap with admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const adminName = adminUser?.name || "Grow Tech Admin";
  const adminEmail = adminUser?.email || "admin@growtech.in";
  const adminRole = adminUser?.role || "OWNER";
  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FAF6EC] flex text-[#16130F]">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#EFE8D8] border-r border-[#E2D9C6] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Top: Logo & Badge */}
          <div className="h-16 px-6 border-b border-[#E2D9C6] flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src={logo} alt="Grow Tech" width={110} height={36} priority />
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#243629] text-white px-2 py-0.5 rounded">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1 text-[#5A554C] hover:text-[#16130F] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.12em] text-[#5A554C] font-semibold">
              Management
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
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
        </div>

        {/* Sidebar Bottom: User Profile & Actions */}
        <div className="p-4 border-t border-[#E2D9C6] space-y-3">
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

          {/* User Card */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#FAF6EC] border-b border-[#E2D9C6] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#5A554C] hover:text-[#16130F] rounded-lg border border-[#E2D9C6] cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5A554C]">
              <span>Grow Tech</span>
              <span>/</span>
              <span className="text-[#16130F] font-semibold">Admin Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input Placeholder */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2D9C6] rounded-full text-xs text-[#5A554C] w-64">
              <Search className="w-3.5 h-3.5 text-[#5A554C]/70" />
              <input
                type="text"
                placeholder="Search leads, services, docs..."
                className="bg-transparent text-xs text-[#16130F] placeholder:text-stone-400 outline-none w-full"
              />
            </div>

            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{adminRole}</span>
            </div>

            {/* Notification button */}
            <button
              className="relative p-2 rounded-full border border-[#E2D9C6] bg-white text-[#5A554C] hover:text-[#16130F] hover:bg-[#FAF6EC] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3D9129]" />
            </button>
          </div>
        </header>

        {/* Dashboard Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
