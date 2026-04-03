"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { User, Bell, Shield, Paintbrush, Monitor, Moon, Sun, Check } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { theme, setTheme } = useTheme();
  
  // Profile state
  const { userName, userEmail, userAvatar, updateProfile } = useFinanceStore();
  const [nameInput, setNameInput] = useState(userName);
  const [emailInput, setEmailInput] = useState(userEmail);
  const [avatarInput, setAvatarInput] = useState(userAvatar);
  const [isSaved, setIsSaved] = useState(false);

  // Mock states for other tabs
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveProfile = () => {
    updateProfile(nameInput, emailInput, avatarInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAvatarChange = () => {
    const newAvatars = [
      "https://i.pravatar.cc/150?img=33",
      "https://i.pravatar.cc/150?img=47",
      "https://i.pravatar.cc/150?img=12",
      "https://i.pravatar.cc/150?img=68"
    ];
    const currentIndex = newAvatars.indexOf(avatarInput);
    const nextIndex = (currentIndex + 1) % newAvatars.length;
    setAvatarInput(newAvatars[nextIndex]);
  };

  const tabs = [
    { id: "Profile", icon: User },
    { id: "Notifications", icon: Bell },
    { id: "Security", icon: Shield },
    { id: "Appearance", icon: Paintbrush },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col mb-8 mt-2">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-cyan-400 dark:to-blue-500">
          Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Manage your account preferences and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium ${
                  isActive 
                  ? "bg-white/60 dark:bg-white/[0.08] text-cyan-600 dark:text-cyan-400 shadow-sm border border-transparent dark:border-white/[0.05]"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.id}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          <GlassCard className="p-8 space-y-6">
            <h3 className="text-xl font-bold border-b border-slate-200/50 dark:border-white/[0.08] pb-4 text-slate-900 dark:text-slate-100">
              {activeTab} Information
            </h3>
            
            {activeTab === "Profile" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 dark:border-white/[0.1] shadow-md">
                    <img src={avatarInput} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <button 
                      onClick={handleAvatarChange}
                      className="px-4 py-2 bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white dark:text-slate-200 rounded-xl font-medium transition-colors shadow-sm border border-transparent dark:border-white/[0.05]"
                    >
                      Cycle Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <input 
                      type="text" 
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-4 py-2 bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700 dark:text-slate-100 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-2 bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 dark:border-white/[0.1] rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 text-slate-700 dark:text-slate-100 transition-all" 
                    />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200/50 dark:border-white/[0.08] flex justify-end items-center gap-4">
                  {isSaved && <span className="text-emerald-500 font-medium flex items-center gap-1 animate-in fade-in"><Check className="w-4 h-4"/> Saved</span>}
                  <button 
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-white/[0.03] rounded-2xl border border-white/60 dark:border-white/[0.05]">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Push Notifications</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts on your device for incoming transactions.</p>
                  </div>
                  <button 
                    onClick={() => setPushNotifs(!pushNotifs)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${pushNotifs ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${pushNotifs ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-white/[0.03] rounded-2xl border border-white/60 dark:border-white/[0.05]">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Email Digest</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Receive a weekly email summarizing your spending.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${emailNotifs ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${emailNotifs ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-white/[0.03] rounded-2xl border border-white/60 dark:border-white/[0.05]">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
                  </div>
                  <button 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${twoFactor ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${twoFactor ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="pt-4 border-t border-slate-200/50 dark:border-white/[0.08]">
                  <button className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl font-medium transition-colors border border-rose-500/20">
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Appearance" && (
              <div className="space-y-6 animate-in fade-in">
                <p className="text-slate-600 dark:text-slate-400">Choose how the application looks to you.</p>
                <div className="grid grid-cols-3 gap-4">
                  <button 
                    onClick={() => setTheme("light")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${theme === 'light' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-200 dark:border-white/[0.08] hover:bg-white/40 dark:hover:bg-white/[0.02]'}`}
                  >
                    <Sun className="w-8 h-8 text-amber-500" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">Light</span>
                  </button>

                  <button 
                    onClick={() => setTheme("dark")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${theme === 'dark' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-200 dark:border-white/[0.08] hover:bg-white/40 dark:hover:bg-white/[0.02]'}`}
                  >
                    <Moon className="w-8 h-8 text-indigo-400" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">Dark</span>
                  </button>

                  <button 
                    onClick={() => setTheme("system")}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${theme === 'system' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-200 dark:border-white/[0.08] hover:bg-white/40 dark:hover:bg-white/[0.02]'}`}
                  >
                    <Monitor className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">System</span>
                  </button>
                </div>
              </div>
            )}

          </GlassCard>
        </div>
      </div>
    </div>
  );
}