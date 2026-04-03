"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Plus } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { transactionSchema } from "@/schemas/transactionSchema";
import { z } from "zod";

export function TransactionDialog() {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    try {
      const formValues = {
        id: "temp", // will be overwritten in store
        date: formData.get("date") as string,
        amount: parseFloat(formData.get("amount") as string),
        category: formData.get("category") as string,
        type: formData.get("type") as "income" | "expense",
        description: formData.get("description") as string,
      };

      const validData = transactionSchema.parse(formValues);
      
      addTransaction({
        date: validData.date,
        amount: validData.amount,
        category: validData.category,
        type: validData.type,
        description: validData.description,
      });

      setOpen(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message || "Invalid data");
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20">
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-2xl p-6 md:p-8 rounded-3xl animate-in zoom-in-95 duration-200">
          <Dialog.Title className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 mb-2">
            New Transaction
          </Dialog.Title>
          <Dialog.Description className="text-slate-500 dark:text-slate-400 mb-6">
            Enter the details of your transaction below.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Type</label>
                <select name="type" required className="w-full bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Date</label>
                <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Amount ($)</label>
              <input type="number" step="0.01" min="0.01" name="amount" required placeholder="0.00" className="w-full bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Category</label>
              <input type="text" name="category" required placeholder="e.g. Groceries, Salary, Rent" className="w-full bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Description (Optional)</label>
              <input type="text" name="description" placeholder="Brief note" className="w-full bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20">
                Save
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
