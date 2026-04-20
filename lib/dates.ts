const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function parseContentDate(value: string): Date | null {
  const normalized = value.trim();
  if (!normalized) return null;

  const date = DATE_ONLY_RE.test(normalized)
    ? new Date(`${normalized}T00:00:00.000Z`)
    : new Date(normalized);

  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function formatContentDate(
  value: string,
  options: Intl.DateTimeFormatOptions
): string {
  const parsed = parseContentDate(value);
  if (!parsed) return value;

  return new Intl.DateTimeFormat("en-US", {
    ...options,
    // Keep date-only frontmatter stable across user locales/timezones.
    timeZone: "UTC",
  }).format(parsed);
}
