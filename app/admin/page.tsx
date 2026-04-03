"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Users, Activity, ShieldAlert, Database } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const role = useFinanceStore((state) => state.role);
  const router = useRouter();

  useEffect(() => {
    if (role !== "admin") {
      router.push("/");
    }
  }, [role, router]);

  if (role !== "admin") return null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col mb-8 mt-2">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
          Admin Control Panel
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          System overview and administrative controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-500" },
          { label: "Active Sessions", value: "84", icon: Activity, color: "text-teal-500" },
          { label: "System Health", value: "99.9%", icon: Database, color: "text-emerald-500" },
          { label: "Security Alerts", value: "0", icon: ShieldAlert, color: "text-rose-500" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>
      
      <GlassCard className="p-8">
        <h3 className="text-xl font-bold mb-4">Recent Audit Logs</h3>
        <div className="space-y-4">
          {[
            { action: "User Role Updated", user: "system_admin", time: "2 mins ago" },
            { action: "Database Backup Completed", user: "system", time: "1 hour ago" },
            { action: "Failed Login Attempt", user: "unknown_ip", time: "3 hours ago" },
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/40 dark:border-white/5">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{log.action}</p>
                <p className="text-sm text-slate-500">by {log.user}</p>
              </div>
              <span className="text-sm text-slate-500">{log.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}