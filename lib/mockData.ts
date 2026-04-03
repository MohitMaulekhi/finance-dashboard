import { Transaction } from "@/types";

export const initialTransactions: Transaction[] = [
  { id: "tx-b8a97c", date: "2026-03-31", amount: 1560.5, category: "Salary", type: "income", description: "March Payroll" },
  { id: "tx-f1d2e3", date: "2026-04-01", amount: 120.0, category: "Groceries", type: "expense", description: "Whole Foods" },
  { id: "tx-5h6j7k", date: "2026-04-02", amount: 800.0, category: "Rent", type: "expense", description: "Apartment Rent" },
  { id: "tx-9p0q1r", date: "2026-04-02", amount: 45.99, category: "Utilities", type: "expense", description: "Internet Bill" },
  { id: "tx-2m3n4b", date: "2026-04-03", amount: 350.0, category: "Freelance", type: "income", description: "Client Project" },
  { id: "tx-7v8w9x", date: "2026-04-03", amount: 22.5, category: "Entertainment", type: "expense", description: "Netflix Subscription" },
  { id: "tx-c4d5e6", date: "2026-04-03", amount: 150.0, category: "Dining", type: "expense", description: "Dinner Date" },
];
