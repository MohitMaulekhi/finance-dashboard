"use client";

import { useState } from "react";
import Win2000Window from "./win2000-window";
import Win2000Taskbar from "./win2000-taskbar";

export default function Win2000Desktop() {
  const [activeWindow, setActiveWindow] = useState<string | null>("welcome");
  const [openWindows, setOpenWindows] = useState<string[]>(["welcome", "my-computer"]);
  const [minimized, setMinimized] = useState<string[]>([]);

  const closeWindow = (id: string) => {
    setOpenWindows((w) => w.filter((x) => x !== id));
    setMinimized((m) => m.filter((x) => x !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: string) => {
    setMinimized((m) => (m.includes(id) ? m : [...m, id]));
    if (activeWindow === id) setActiveWindow(null);
  };

  const restoreWindow = (id: string) => {
    setMinimized((m) => m.filter((x) => x !== id));
    setActiveWindow(id);
  };

  const focusWindow = (id: string) => {
    setActiveWindow(id);
    setMinimized((m) => m.filter((x) => x !== id));
  };

  const windows = [
    { id: "welcome", title: "Welcome to Next.js — Microsoft Internet Explorer" },
    { id: "my-computer", title: "My Computer" },
  ];

  return (
    <div className="win-desktop">
      {/* Desktop Icons */}
      <div className="win-desktop-icons">
        <DesktopIcon icon="🖥️" label="My Computer" onClick={() => {
          if (!openWindows.includes("my-computer")) {
            setOpenWindows((w) => [...w, "my-computer"]);
          }
          focusWindow("my-computer");
        }} />
        <DesktopIcon icon="🗑️" label="Recycle Bin" onClick={() => {}} />
        <DesktopIcon icon="📁" label="My Documents" onClick={() => {}} />
        <DesktopIcon icon="🌐" label="Internet Explorer" onClick={() => {
          if (!openWindows.includes("welcome")) {
            setOpenWindows((w) => [...w, "welcome"]);
          }
          focusWindow("welcome");
        }} />
        <DesktopIcon icon="📝" label="Notepad" onClick={() => {}} />
      </div>

      {/* Windows */}
      {openWindows.includes("welcome") && !minimized.includes("welcome") && (
        <Win2000Window
          id="welcome"
          title="Welcome to Next.js — Microsoft Internet Explorer"
          isActive={activeWindow === "welcome"}
          initialPosition={{ x: 120, y: 60 }}
          initialSize={{ width: 700, height: 520 }}
          onFocus={() => focusWindow("welcome")}
          onClose={() => closeWindow("welcome")}
          onMinimize={() => minimizeWindow("welcome")}
        >
          <IEContent />
        </Win2000Window>
      )}

      {openWindows.includes("my-computer") && !minimized.includes("my-computer") && (
        <Win2000Window
          id="my-computer"
          title="My Computer"
          isActive={activeWindow === "my-computer"}
          initialPosition={{ x: 60, y: 40 }}
          initialSize={{ width: 520, height: 380 }}
          onFocus={() => focusWindow("my-computer")}
          onClose={() => closeWindow("my-computer")}
          onMinimize={() => minimizeWindow("my-computer")}
        >
          <MyComputerContent />
        </Win2000Window>
      )}

      {/* Taskbar */}
      <Win2000Taskbar
        windows={windows.filter((w) => openWindows.includes(w.id))}
        activeWindow={activeWindow}
        minimized={minimized}
        onClickTask={(id) => {
          if (minimized.includes(id)) {
            restoreWindow(id);
          } else if (activeWindow === id) {
            minimizeWindow(id);
          } else {
            focusWindow(id);
          }
        }}
      />
    </div>
  );
}

function DesktopIcon({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button className="win-desktop-icon" onClick={onClick} aria-label={label}>
      <span className="win-desktop-icon-img" aria-hidden="true">{icon}</span>
      <span className="win-desktop-icon-label">{label}</span>
    </button>
  );
}

function IEContent() {
  return (
    <div className="win-ie-content">
      {/* IE Toolbar */}
      <div className="win-ie-toolbar">
        <button className="win-ie-btn" title="Back">◀ Back</button>
        <button className="win-ie-btn" title="Forward">Forward ▶</button>
        <div className="win-ie-separator" />
        <button className="win-ie-btn" title="Stop">■ Stop</button>
        <button className="win-ie-btn" title="Refresh">⟳ Refresh</button>
        <div className="win-ie-separator" />
        <button className="win-ie-btn" title="Home">⌂ Home</button>
      </div>
      {/* Address Bar */}
      <div className="win-ie-address">
        <span className="win-ie-address-label">Address</span>
        <div className="win-field win-field-sunken win-ie-address-input">
          <span className="win-ie-address-icon">🌐</span>
          https://nextjs.org/
        </div>
        <button className="win-btn-raised win-ie-go">Go</button>
      </div>
      {/* Page Content */}
      <div className="win-ie-page">
        <div className="win-ie-page-inner">
          <div className="win-ie-banner">
            <div className="win-ie-banner-logo">
              <span className="win-ie-n-logo">N</span>
              <div>
                <div className="win-ie-banner-title">Next.js</div>
                <div className="win-ie-banner-subtitle">The React Framework for the Web</div>
              </div>
            </div>
          </div>

          <div className="win-ie-section">
            <div className="win-section-title">
              <span className="win-section-icon">📌</span>
              Get Started
            </div>
            <p className="win-ie-body-text">
              To get started, edit the <code className="win-code">page.tsx</code> file.
              Your page will auto-update as you edit the file.
            </p>
            <p className="win-ie-body-text">
              Looking for a starting point or more instructions? Visit the resources below:
            </p>
          </div>

          <div className="win-ie-links-grid">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="win-ie-link-card"
            >
              <span className="win-ie-link-icon">📖</span>
              <div>
                <div className="win-ie-link-title">Documentation</div>
                <div className="win-ie-link-desc">Find in-depth information about Next.js features and API.</div>
              </div>
            </a>
            <a
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="win-ie-link-card"
            >
              <span className="win-ie-link-icon">🎓</span>
              <div>
                <div className="win-ie-link-title">Learn</div>
                <div className="win-ie-link-desc">Learn about Next.js in an interactive course with quizzes.</div>
              </div>
            </a>
            <a
              href="https://vercel.com/templates"
              target="_blank"
              rel="noopener noreferrer"
              className="win-ie-link-card"
            >
              <span className="win-ie-link-icon">🖼️</span>
              <div>
                <div className="win-ie-link-title">Templates</div>
                <div className="win-ie-link-desc">Explore starter templates for Next.js applications.</div>
              </div>
            </a>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="win-ie-link-card win-ie-link-card-deploy"
            >
              <span className="win-ie-link-icon">🚀</span>
              <div>
                <div className="win-ie-link-title">Deploy Now</div>
                <div className="win-ie-link-desc">Instantly deploy your Next.js site to Vercel.</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* Status bar */}
      <div className="win-ie-statusbar">
        <div className="win-ie-status-left">Done</div>
        <div className="win-ie-status-right">
          <span>Internet</span>
        </div>
      </div>
    </div>
  );
}

function MyComputerContent() {
  const items = [
    { icon: "💾", label: "3½ Floppy (A:)" },
    { icon: "💿", label: "Local Disk (C:)" },
    { icon: "📀", label: "CD-ROM Drive (D:)" },
    { icon: "🖨️", label: "Control Panel" },
    { icon: "🌐", label: "Network Places" },
    { icon: "📋", label: "Printers" },
  ];

  return (
    <div className="win-explorer-content">
      {/* Explorer Toolbar */}
      <div className="win-ie-toolbar">
        <button className="win-ie-btn">◀ Back</button>
        <button className="win-ie-btn">Forward ▶</button>
        <div className="win-ie-separator" />
        <button className="win-ie-btn">⬆ Up</button>
        <div className="win-ie-separator" />
        <button className="win-ie-btn">📋 Copy</button>
        <button className="win-ie-btn">✂️ Cut</button>
        <button className="win-ie-btn">📌 Paste</button>
      </div>
      {/* Address */}
      <div className="win-ie-address">
        <span className="win-ie-address-label">Address</span>
        <div className="win-field win-field-sunken win-ie-address-input">
          🖥️ My Computer
        </div>
      </div>
      {/* Body */}
      <div className="win-explorer-body">
        <div className="win-explorer-sidebar">
          <div className="win-explorer-sidebar-title">System Tasks</div>
          <ul className="win-explorer-sidebar-list">
            <li><a href="#" className="win-link">View system information</a></li>
            <li><a href="#" className="win-link">Add or remove programs</a></li>
            <li><a href="#" className="win-link">Change a setting</a></li>
          </ul>
          <div className="win-explorer-sidebar-title" style={{marginTop: "12px"}}>Other Places</div>
          <ul className="win-explorer-sidebar-list">
            <li><a href="#" className="win-link">My Network Places</a></li>
            <li><a href="#" className="win-link">My Documents</a></li>
            <li><a href="#" className="win-link">Shared Documents</a></li>
            <li><a href="#" className="win-link">Control Panel</a></li>
          </ul>
        </div>
        <div className="win-explorer-files">
          {items.map((item) => (
            <div key={item.label} className="win-file-icon">
              <span className="win-file-icon-img" aria-hidden="true">{item.icon}</span>
              <span className="win-file-icon-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="win-ie-statusbar">
        <div className="win-ie-status-left">{items.length} objects</div>
      </div>
    </div>
  );
}
