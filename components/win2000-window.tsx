"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  isActive: boolean;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
}

export default function Win2000Window({
  title,
  isActive,
  initialPosition,
  initialSize,
  onFocus,
  onClose,
  onMinimize,
  children,
}: Props) {
  const [pos, setPos] = useState(initialPosition);
  const [size] = useState(initialSize);
  const [maximized, setMaximized] = useState(false);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (maximized) return;
      onFocus();
      dragging.current = true;
      offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };

      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        setPos({
          x: Math.max(0, ev.clientX - offset.current.x),
          y: Math.max(0, ev.clientY - offset.current.y),
        });
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pos, maximized, onFocus]
  );

  const style = maximized
    ? { top: 0, left: 0, width: "100vw", height: "calc(100vh - 40px)", zIndex: isActive ? 20 : 10 }
    : { top: pos.y, left: pos.x, width: size.width, height: size.height, zIndex: isActive ? 20 : 10 };

  return (
    <div
      className={`win-window${isActive ? " win-window-active" : ""}`}
      style={{ ...style, position: "absolute" }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`win-titlebar${isActive ? " win-titlebar-active" : " win-titlebar-inactive"}`}
        onMouseDown={onMouseDown}
      >
        <div className="win-titlebar-icon" aria-hidden="true">🌐</div>
        <span className="win-titlebar-text">{title}</span>
        <div className="win-titlebar-buttons">
          <button
            className="win-title-btn win-btn-minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            aria-label="Minimize"
            title="Minimize"
          >
            <span aria-hidden="true">_</span>
          </button>
          <button
            className="win-title-btn win-btn-maximize"
            onClick={(e) => { e.stopPropagation(); setMaximized((m) => !m); }}
            aria-label={maximized ? "Restore" : "Maximize"}
            title={maximized ? "Restore" : "Maximize"}
          >
            <span aria-hidden="true">{maximized ? "❐" : "□"}</span>
          </button>
          <button
            className="win-title-btn win-btn-close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            title="Close"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>
      {/* Menu Bar */}
      <div className="win-menubar">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
          <button key={m} className="win-menu-item">{m}</button>
        ))}
      </div>
      {/* Window Content */}
      <div className="win-window-body">{children}</div>
    </div>
  );
}
