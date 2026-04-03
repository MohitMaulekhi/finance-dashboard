import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, UserRole } from "@/types";
import { initialTransactions } from "@/lib/mockData";

interface FinanceState {
  transactions: Transaction[];
  role: UserRole;
  searchQuery: string;
  categoryFilter: string | null;
  
  // User Profile
  userName: string;
  userEmail: string;
  userAvatar: string;

  // Actions
  setRole: (role: UserRole) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, updated: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateProfile: (name: string, email: string, avatar: string) => void;

  // Selectors (derived state helpers theoretically but typical zustand keeps them in components or as getters if simple)
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: initialTransactions,
      role: "viewer", // default viewing role
      searchQuery: "",
      categoryFilter: null,
      userName: "Alex Johnson",
      userEmail: "alex.j@example.com",
      userAvatar: "https://i.pravatar.cc/150?img=33",

      setRole: (role) => set({ role }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      
      updateProfile: (name, email, avatar) => set({ userName: name, userEmail: email, userAvatar: avatar }),

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            { ...tx, id: `tx-${Math.random().toString(36).substr(2, 9)}` },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updated } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
    }),
    {
      name: "finance-dashboard-storage",
    }
  )
);
