"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";

export default function BudgetsPage() {
  const transactions = useFinanceStore((state) => state.transactions);
  
  // Fake budgets for demo
  const budgets = [
    { category: "Housing", limit: 2000 },
    { category: "Food", limit: 600 },
    { category: "Transport", limit: 400 },
    { category: "Entertainment", limit: 300 },
  ];

  const getSpent = (category: string) => {
    return transactions
      .filter(t => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col mb-8 mt-2">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
          Budgets
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Track your spending limits across categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget, i) => {
          const spent = getSpent(budget.category);
          const percent = Math.min((spent / budget.limit) * 100, 100);
          const isOver = spent > budget.limit;

          return (
            <GlassCard key={i} className="p-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{budget.category}</h3>
                  <p className="text-sm text-slate-500">
                    {formatCurrency(spent)} spent of {formatCurrency(budget.limit)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-lg ${isOver ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {percent.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300/50 dark:border-slate-700/50">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              {isOver && (
                <p className="text-xs text-rose-500 mt-2 font-medium">Over budget by {formatCurrency(spent - budget.limit)}</p>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}