"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowLeftRight, BarChart3, Settings, ShieldCheck, Wallet } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";

export function MobileNav() {
  const pathname = usePathname();
  const role = useFinanceStore((state) => state.role);

  const NAV_ITEMS = [
    { href: "/", label: "Dash", icon: LayoutDashboard },
    { href: "/transactions", label: "Txns", icon: ArrowLeftRight },
    { href: "/budgets", label: "Budgets", icon: Wallet },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ...(role === "admin" ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }] : []),
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <nav className="flex items-center justify-around bg-white/70 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/60 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-full px-2 py-3 overflow-x-auto gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[60px]",
                isActive
                  ? "text-cyan-600 dark:text-cyan-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}