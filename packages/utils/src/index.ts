// ── Date helpers (Student 2) ──────────────────────────────────
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function timeAgo(date: string | Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── String helpers (Student 2) ────────────────────────────────
export function truncate(str: string, maxLength: number): string {
  return str.length <= maxLength ? str : str.slice(0, maxLength - 3) + "...";
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

// ── Storage helper (Student 2) ────────────────────────────────
export function getStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ── Search / sort helpers (Student 2) ────────────────────────
export function filterBySearch<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(item =>
    fields.some(f => String(item[f] ?? "").toLowerCase().includes(q))
  );
}

export function sortBy<T>(items: T[], key: keyof T, dir: "asc" | "desc" = "asc"): T[] {
  return [...items].sort((a, b) => {
    const av = a[key], bv = b[key];
    if (av === bv) return 0;
    const cmp = av! < bv! ? -1 : 1;
    return dir === "asc" ? cmp : -cmp;
  });
}
