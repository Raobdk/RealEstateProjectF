"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  MapPin,
  UserCheck,
  CreditCard,
  DollarSign,
  Wallet,
  FileText,
  TrendingUp,
  Banknote,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Agents", href: "/admin/agents", icon: ShieldCheck },
  { title: "Projects", href: "/admin/projects", icon: Building2 },
  { title: "Plots", href: "/admin/plots", icon: MapPin },
  { title: "Partners", href: "/admin/partners", icon: UserCheck },
  { title: "Installments", href: "/admin/installments", icon: CreditCard },
  { title: "Commissions", href: "/admin/commissions", icon: DollarSign },
  { title: "Seller Payments", href: "/admin/seller-payments", icon: Wallet },
  { title: "Ledgers", href: "/admin/ledgers", icon: FileText },
  { title: "Financial Reports", href: "/admin/reports", icon: TrendingUp },
  { title: "Bank Accounts", href: "/admin/bank-accounts", icon: Banknote },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-[#E7EAEF] bg-white overflow-y-auto scrollbar-thin flex flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-[#E7EAEF] px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6139DB]">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#111111]">Landora</span>
            <span className="text-[8px] uppercase tracking-[0.1em] text-[#3A3C40]/60">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#6139DB] text-white"
                  : "text-[#3A3C40] hover:bg-[#E7EAEF] hover:text-[#111111]"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-[#6139DB]/20 px-2 py-0.5 text-xs text-[#6139DB]">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#E7EAEF] p-4">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#3A3C40] hover:bg-[#E7EAEF]"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

