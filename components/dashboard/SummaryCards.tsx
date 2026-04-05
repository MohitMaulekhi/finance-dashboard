"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { GlassCard } from "../ui/GlassCard";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export function SummaryCards() {
  const transactions = useFinanceStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: Wallet,
      color: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-100/50 dark:bg-blue-900/30",
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-100/50 dark:bg-emerald-900/30",
    },
    {
      title: "Total Expenses",
      amount: totalExpense,
      icon: TrendingDown,
      color: "text-rose-600 dark:text-rose-400",
      bgClass: "bg-rose-100/50 dark:bg-rose-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <GlassCard key={idx} className="p-4 md:p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                  {card.title}
                </p>
                <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                  {formatCurrency(card.amount)}
                </h3>
              </div>
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${card.bgClass} flex items-center justify-center backdrop-blur-xl shadow-inner`}>
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${card.color}`} strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Decorative background flare */}
            <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${card.bgClass} blur-3xl opacity-60 pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
          </GlassCard>
        );
      })}
    </div>
  );
}
