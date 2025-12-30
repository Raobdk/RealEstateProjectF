"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Home,
  MapPin,
  Users,
  DollarSign,
  CreditCard,
  Bell,
  FileText,
  LogOut,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  requiresProfile?: boolean;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { title: "Profile", href: "/agent/profile", icon: User, requiresProfile: true },
  { title: "Listings", href: "/agent/listings", icon: Home },
  { title: "Projects & Plots", href: "/agent/plots", icon: MapPin },
  { title: "Leads", href: "/agent/leads", icon: Users },
  { title: "Buyers", href: "/agent/customers", icon: Users },
  { title: "Commissions", href: "/agent/commissions", icon: DollarSign },
  { title: "Installments", href: "/agent/installments", icon: CreditCard },
  { title: "Notifications", href: "/agent/notifications", icon: Bell },
  { title: "Reports", href: "/agent/reports", icon: FileText },
];

export function AgentSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [profileIncomplete, setProfileIncomplete] = useState(false);

  useEffect(() => {
    // Check if profile is incomplete
    if (user) {
      const hasBasicInfo = user.name && user.email && user.phone;
      const hasAgentProfile = user.agentProfile?.licenseNumber || user.profile?.cnic;
      setProfileIncomplete(!hasBasicInfo || !hasAgentProfile);
    }
  }, [user]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      window.location.href = "/auth/login";
      localStorage.clear();
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-[#E7EAEF] bg-white overflow-y-auto scrollbar-thin flex flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-[#E7EAEF] px-6">
        <Link href="/agent" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6139DB]">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#111111]">Landora</span>
            <span className="text-[8px] uppercase tracking-[0.1em] text-[#3A3C40]/60">
              Agent Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Profile Completion Warning */}
      {profileIncomplete && (
        <div className="mx-3 mt-4 mb-2">
          <Link href="/agent/profile">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 cursor-pointer hover:bg-yellow-100 transition-colors">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-yellow-800">Complete Your Profile</p>
                  <p className="text-[10px] text-yellow-700 mt-0.5 leading-tight">
                    Add missing details to unlock all features
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          const showWarning = item.requiresProfile && profileIncomplete;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors relative",
                isActive
                  ? "bg-[#6139DB] text-white"
                  : "text-[#3A3C40] hover:bg-[#E7EAEF] hover:text-[#111111]"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{item.title}</span>
              {showWarning && (
                <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
              )}
              {item.badge && (
                <span className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-xs flex-shrink-0",
                  isActive ? "bg-white/20 text-white" : "bg-[#6139DB]/20 text-[#6139DB]"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#E7EAEF] p-4 space-y-1">
        <Link
          href="/agent/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#3A3C40] hover:bg-[#E7EAEF]"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

