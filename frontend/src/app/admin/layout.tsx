"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, Bell } from "lucide-react";
import { AdminSidebar } from "@/components/admin";
import { getStoredAdmin } from "@/lib/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If this is the login route inside admin, don't wrap with admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const adminUser = getStoredAdmin();
  const adminRole = adminUser?.role || "OWNER";

  return (
    <div className="min-h-screen bg-[#FAF6EC] flex text-[#16130F]">
      {/* 
        Standalone Separate Sidebar Component:
        - Fits full viewport height (h-screen max-h-screen)
        - Sticky top-0 (stays pinned, does NOT scroll with page)
        - Internal scroll only for navigation items if needed on short screens
      */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-[#FAF6EC]/90 backdrop-blur-sm border-b border-[#E2D9C6] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#5A554C] hover:text-[#16130F] rounded-lg border border-[#E2D9C6] cursor-pointer"
              aria-label="Open navigation menu"
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
