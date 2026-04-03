"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowLeftRight, BarChart3, Settings, ShieldCheck, Wallet } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { useFinanceStore } from "@/store/useFinanceStore";

export function Sidebar() {
  const pathname = usePathname();
  const role = useFinanceStore((state) => state.role);

  const NAV_ITEMS = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
    { href: "/budgets", label: "Budgets", icon: Wallet },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ...(role === "admin" ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }] : []),
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-2rem)] sticky top-4 left-4 mr-4 py-8 px-6 bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/60 dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-[40px]">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          F
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          FinDash
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ease-out font-medium",
                isActive
                  ? "bg-white/60 dark:bg-white/[0.08] text-cyan-600 dark:text-cyan-400 shadow-sm border border-transparent dark:border-white/[0.05]"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-cyan-600 dark:text-cyan-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <GlassCard className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-white/[0.05] dark:to-transparent border border-transparent dark:border-white/[0.05] shadow-none">
          <div className="flex items-center justify-between mb-3">
            <span suppressHydrationWarning className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className="text-xs font-medium px-2 py-1 bg-white/50 dark:bg-black/20 rounded-md text-slate-500 dark:text-slate-400">
              Today
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-slate-600 dark:text-slate-300">No bills due</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span className="text-slate-600 dark:text-slate-300 opacity-60">Payday in 4 days</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </aside>
  );
}