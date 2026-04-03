"use client";

import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function Home() {
  const transactions = useFinanceStore(state => state.transactions).slice(0, 5);
  const userName = useFinanceStore(state => state.userName);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col mb-8 mt-2">
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 mb-2">
          Welcome back, {userName.split(' ')[0]}.
        </h1>
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Dashboard Overview
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Track your overall financial summary and visualizations.
        </p>
      </div>

      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div className="lg:col-span-1">
          {/* Recent Transactons mini widget */}
          <div className="bg-white/40 dark:bg-black/30 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] p-6 h-full flex flex-col items-center">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 w-full mb-6">
              Recent Activity
            </h3>
            <div className="w-full flex-1 flex flex-col gap-4 overflow-y-auto">
              {transactions.length > 0 ? transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-white/30 dark:bg-black/20 rounded-2xl border border-white/50 dark:border-white/5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{tx.description || tx.category}</span>
                    <span className="text-xs text-slate-500">{format(parseISO(tx.date), "MMM dd")}</span>
                  </div>
                  <div className={`font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </div>
                </div>
              )) : (
                 <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-10">
                   No transactions found.
                 </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
