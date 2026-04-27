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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
  const currentIndex = themes.findIndex((t) => t.id === current);

  useEffect(() => {
    if (!open) return;
    const focusIndex = currentIndex >= 0 ? currentIndex : 0;
    const frame = window.requestAnimationFrame(() => {
      itemRefs.current[focusIndex]?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, currentIndex]);

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    const items = itemRefs.current.filter(
      (item): item is HTMLButtonElement => item !== null
    );
    if (items.length === 0) return;

    const activeIndex = items.findIndex((item) => item === document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % items.length;
      items[nextIndex]?.focus();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex =
        activeIndex === -1
          ? items.length - 1
          : (activeIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
      return;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={triggerRef}
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
          aria-label="Theme options"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-card"
        >
          {themes.map((t, index) => {
            const active = current === t.id;
            return (
              <button
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
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
