"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const trimmedName = name.trim();
  const trimmedFrom = from.trim();
  const trimmedMessage = message.trim();
  const canSubmit =
    trimmedName.length > 0 &&
    trimmedFrom.length > 0 &&
    trimmedMessage.length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = encodeURIComponent(
      `Hello from ${trimmedName || "your site"}`
    );
    const body = encodeURIComponent(
      `${trimmedMessage}\n\n— ${trimmedName}${trimmedFrom ? ` (${trimmedFrom})` : ""}`
    );
    window.location.href = `mailto:${encodeURIComponent(
      email
    )}?subject=${subject}&body=${body}`;
    setName("");
    setFrom("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Your email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send message
        <Send className="h-4 w-4" />
      </button>
      <p className="text-xs text-muted-foreground">
        This will open your email client. No data is sent anywhere else.
      </p>
    </form>
  );
}
