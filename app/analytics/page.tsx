"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f43f5e'];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const transactions = useFinanceStore((state) => state.transactions);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Expenses by Category
  const expenses = transactions.filter(t => t.type === "expense");
  const categoryData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Insights Data
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
  const highestCategory = pieData.length > 0 ? pieData[0] : null;
  
  const avgTransactionSize = expenses.length > 0 ? totalExpense / expenses.length : 0;
  const recentLargeExpense = expenses.filter(e => e.amount > avgTransactionSize * 1.5).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-8 animate-in fade-in zoom-in duration-500 pb-12">
      <div className="flex flex-col mb-4 md:mb-8 mt-2">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Analytics & Insights
        </h2>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1 md:mt-2">
          Deep dive into your spending patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Chart Card */}
        <GlassCard className="p-4 md:p-8 h-[400px] md:h-[500px] flex flex-col relative w-full">
          <div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Spending Breakdown
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Where your money goes</p>
          </div>
          
          <div className="flex-1 w-full min-h-0">
            {!mounted ? (
              <div className="w-full h-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse rounded-xl" />
            ) : pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "16px",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                    }}
                    itemStyle={{ color: isDark ? "#f8fafc" : "#0f172a", fontWeight: "bold" }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">
                No expense data available
              </div>
            )}
          </div>
        </GlassCard>

        {/* Insights List Card */}
        <div className="space-y-4 md:space-y-6">
          <GlassCard className="p-4 md:p-8 relative overflow-hidden group">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Top Spending Category
            </h4>
            {highestCategory ? (
              <div>
                <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-400">
                  {highestCategory.name}
                </p>
                <p className="text-xl font-medium text-slate-600 dark:text-slate-300 mt-2">
                  {formatCurrency(highestCategory.value)} <span className="text-sm text-slate-400">({((highestCategory.value / totalExpense) * 100).toFixed(1)}% of total)</span>
                </p>
              </div>
            ) : (
              <p className="text-slate-500">N/A</p>
            )}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-rose-500/10 dark:bg-rose-500/20 blur-3xl opacity-60 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          </GlassCard>

          <GlassCard className="p-4 md:p-8 relative overflow-hidden group">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Key Observations
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/40 dark:border-white/5">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Your average transaction size is <strong className="text-slate-900 dark:text-white">{formatCurrency(avgTransactionSize)}</strong>.
                </p>
              </div>

              {recentLargeExpense.length > 0 && (
                <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/40 dark:border-white/5">
                  <div className="w-2 h-2 mt-2 rounded-full bg-amber-500" />
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <p>Recent notable expenses above average:</p>
                    <ul className="mt-2 space-y-1">
                      {recentLargeExpense.map(ex => (
                        <li key={ex.id} className="text-sm font-medium flex justify-between">
                          <span>{ex.description || ex.category}</span>
                          <span className="text-slate-900 dark:text-white">{formatCurrency(ex.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-3xl opacity-60 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
