"use client";

import { GlassCard } from "../ui/GlassCard";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useTheme } from "next-themes";
import { formatCurrency } from "@/lib/utils";

export function BalanceChart() {
  const transactions = useFinanceStore((state) => state.transactions);
  const { theme } = useTheme();

  // Create a minimal derived dataset (just sort dates and compute running balance)
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let runningBalance = 0;
  const data = sorted.map(tx => {
    runningBalance += tx.type === "income" ? tx.amount : -tx.amount;
    return {
      date: tx.date,
      balance: runningBalance,
    };
  });

  const isDark = theme === "dark";

  return (
    <GlassCard className="p-6 md:p-8 h-[400px] md:h-[450px] relative w-full mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            Total Earned & Projected
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Balance overview over time</p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? "#3b82f6" : "#0ca5e9"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isDark ? "#3b82f6" : "#0ca5e9"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                borderRadius: "16px",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
              }}
              itemStyle={{ color: isDark ? "#f8fafc" : "#0f172a", fontWeight: "bold" }}
              labelStyle={{ color: isDark ? "#94a3b8" : "#64748b", marginBottom: "4px" }}
              formatter={(value: any) => [formatCurrency(Number(value)), "Balance"]}
            />
            <ReferenceLine y={500} stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"} strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke={isDark ? "#3b82f6" : "#0ca5e9"} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
