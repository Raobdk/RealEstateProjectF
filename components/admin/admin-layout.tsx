"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { ScrollToTop } from "./scroll-to-top";
import { motion } from "framer-motion";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Desktop Sidebar - Fixed, out of flow */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Topbar - Fixed at top, accounts for sidebar */}
      <div className="hidden lg:block fixed top-0 left-64 right-0 z-40 h-16">
        <AdminTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Mobile Topbar - Full width */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16">
        <AdminTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content - Shifts on desktop to account for sidebar and topbar */}
      <div className="pt-16 lg:pl-64 min-w-0 w-full">
        <ScrollToTop />
        <main className="p-4 sm:p-5 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.aside
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          exit={{ x: -256 }}
          className="fixed left-0 top-0 z-50 h-screen w-64 lg:hidden"
        >
          <AdminSidebar />
        </motion.aside>
      )}
    </div>
  );
}

