"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/utils";
import { Search, Filter, ArrowUpRight, ArrowDownRight, Trash2, Edit } from "lucide-react";
import { TransactionDialog } from "@/components/transactions/TransactionDialog";
import { format, parseISO } from "date-fns";

export default function TransactionsPage() {
  const transactions = useFinanceStore((state) => state.transactions);
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const role = useFinanceStore((state) => state.role);
  
  const [search, setSearch] = React.useState("");
  const [filterType, setFilterType] = React.useState<"all" | "income" | "expense">("all");
  
  const categories = Array.from(new Set(transactions.map(t => t.category)));
  const [filterCategory, setFilterCategory] = React.useState<string>("all");

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch = (tx.description || "").toLowerCase().includes(search.toLowerCase()) || 
                          tx.category.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "all" ? true : tx.type === filterType;
      const matchCategory = filterCategory === "all" ? true : tx.category === filterCategory;
      return matchSearch && matchType && matchCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, search, filterType, filterCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
            Transactions
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Manage and easily search through all your financial records.
          </p>
        </div>
        {role === "admin" && <TransactionDialog />}
      </div>

      <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row gap-4 items-center mb-8 bg-white/60 dark:bg-black/20">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 border-none" />
          <input
            type="text"
            placeholder="Search descriptions or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-100 transition-all font-medium"
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto ml-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2.5 bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-100 transition-all font-medium appearance-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-100 transition-all font-medium appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50 dark:border-slate-800/50 text-sm tracking-wider uppercase text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5">
                <th className="p-4 md:p-6 font-semibold">Transaction</th>
                <th className="p-4 md:p-6 font-semibold">Date</th>
                <th className="p-4 md:p-6 font-semibold">Category</th>
                <th className="p-4 md:p-6 font-semibold text-right">Amount</th>
                {role === "admin" && <th className="p-4 md:p-6 font-semibold text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                    No transactions found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.type === "income";
                  return (
                    <tr key={tx.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 md:p-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl flex-shrink-0 ${isIncome ? "bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100/50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"}`}>
                            {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{tx.description || tx.category}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{tx.id.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:p-6 text-sm font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {format(parseISO(tx.date), "MMM dd, yyyy")}
                      </td>
                      <td className="p-4 md:p-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {tx.category}
                        </span>
                      </td>
                      <td className="p-4 md:p-6 text-right font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                        <span className={isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-slate-100"}>
                          {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                        </span>
                      </td>
                      {role === "admin" && (
                        <td className="p-4 md:p-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit">
                               <Edit className="w-4 h-4" />
                             </button>
                             <button onClick={() => deleteTransaction(tx.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors" title="Delete">
                               <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
      
    </div>
  );
}
