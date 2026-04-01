"use client";

import { useState, useEffect } from "react";

interface TaskbarProps {
  windows: { id: string; title: string }[];
  activeWindow: string | null;
  minimized: string[];
  onClickTask: (id: string) => void;
}

export default function Win2000Taskbar({ windows, activeWindow, minimized, onClickTask }: TaskbarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win-taskbar" role="toolbar" aria-label="Taskbar">
      {/* Start Button */}
      <button className="win-start-btn" aria-label="Start">
        <span className="win-start-logo" aria-hidden="true">🪟</span>
        <span className="win-start-text">Start</span>
      </button>
      <div className="win-taskbar-separator" />
      {/* Quick Launch */}
      <div className="win-quick-launch" aria-label="Quick Launch">
        <button className="win-ql-btn" title="Internet Explorer" aria-label="Internet Explorer">🌐</button>
        <button className="win-ql-btn" title="Show Desktop" aria-label="Show Desktop">🖥️</button>
        <button className="win-ql-btn" title="Media Player" aria-label="Media Player">🎵</button>
      </div>
      <div className="win-taskbar-separator" />
      {/* Running windows */}
      <div className="win-taskbar-windows" role="list">
        {windows.map((w) => {
          const isMin = minimized.includes(w.id);
          const isActive = activeWindow === w.id && !isMin;
          return (
            <button
              key={w.id}
              className={`win-taskbar-btn${isActive ? " win-taskbar-btn-active" : ""}`}
              onClick={() => onClickTask(w.id)}
              role="listitem"
              aria-pressed={isActive}
            >
              <span className="win-taskbar-btn-icon" aria-hidden="true">🌐</span>
              <span className="win-taskbar-btn-text">{w.title.substring(0, 28)}{w.title.length > 28 ? "…" : ""}</span>
            </button>
          );
        })}
      </div>
      {/* System Tray */}
      <div className="win-systray" aria-label="System tray">
        <span className="win-systray-icon" title="Volume" aria-label="Volume">🔊</span>
        <span className="win-systray-icon" title="Network" aria-label="Network">🔌</span>
        <span className="win-systray-icon" title="Language" aria-label="Language">EN</span>
        <div className="win-clock" aria-label={`Current time: ${time}`}>{time}</div>
      </div>
    </div>
  );
}
