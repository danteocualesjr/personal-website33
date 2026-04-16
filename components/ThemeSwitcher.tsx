"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Palette } from "lucide-react";

type ThemeOption = {
  id: string;
  label: string;
  description: string;
};

const themes: ThemeOption[] = [
  {
    id: "minimal",
    label: "Minimal",
    description: "Clean and light",
  },
  {
    id: "minimal-dark",
    label: "Minimal Dark",
    description: "Clean and dark",
  },
  {
    id: "modern",
    label: "Modern",
    description: "Gradients and glass",
  },
  {
    id: "terminal",
    label: "Terminal",
    description: "Developer vibes",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const current = mounted ? theme : "minimal";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground shadow-card hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-card"
        >
          {themes.map((t) => {
            const active = current === t.id;
            return (
              <button
                key={t.id}
                role="menuitemradio"
                aria-checked={active}
                type="button"
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className="flex w-full items-start gap-3 px-3 py-2.5 text-left text-sm hover:bg-muted focus:bg-muted focus:outline-none"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center"
                >
                  {active ? <Check className="h-4 w-4 text-accent" /> : null}
                </span>
                <span className="flex flex-col">
                  <span className="font-medium">{t.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
