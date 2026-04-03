"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { role, setRole, userAvatar } = useFinanceStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full flex justify-center py-4 pointer-events-none sticky top-0 z-50">
      <header className="pointer-events-auto flex items-center gap-2 p-1.5 md:p-2 bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-white/60 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-full transition-all duration-300">
        {/* Role Switcher */}
        <div className="flex items-center bg-white/50 dark:bg-black/40 rounded-full p-1 h-10 shadow-inner border border-transparent dark:border-white/[0.05]">
          <button
            onClick={() => setRole("viewer")}
            className={`px-4 h-full rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              role === "viewer"
                ? "bg-white dark:bg-white/[0.08] text-cyan-600 dark:text-cyan-400 shadow-sm border border-transparent dark:border-white/[0.05]"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 h-full rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              role === "admin"
                ? "bg-white dark:bg-white/[0.08] text-cyan-600 dark:text-cyan-400 shadow-sm border border-transparent dark:border-white/[0.05]"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            Admin
          </button>
        </div>

        <div className="w-px h-6 bg-slate-300/50 dark:bg-slate-700/50 mx-1 md:mx-2"></div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/60 dark:hover:bg-white/[0.08] transition-all duration-300 text-slate-700 dark:text-slate-300"
        >
          {!mounted ? (
            <div className="w-5 h-5" />
          ) : resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        
        {/* User icon */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 dark:border-white/[0.2] shadow-sm ml-1 cursor-pointer hover:scale-105 transition-transform duration-300">
          <img src={userAvatar} alt="User avatar" className="w-full h-full object-cover" />
        </div>
      </header>
    </div>
  );
}