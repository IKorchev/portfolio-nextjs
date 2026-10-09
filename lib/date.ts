// Dates are "YYYY-MM" or full ISO strings. Year and month are read straight from the
// string so a timezone offset can't shift the month.
const parseYearMonth = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return year && month ? { year, month } : null;
};

export const formatMonthYear = (date: string) => {
  const parsed = parseYearMonth(date);
  if (!parsed) return null;
  return new Date(Date.UTC(parsed.year, parsed.month - 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

/** Whole months from `start` to `end` (or now), e.g. May 2025 → Oct 2026 is 17. */
export const monthsBetween = (start: string, end?: string) => {
  const from = parseYearMonth(start);
  const now = new Date();
  const to = end ? parseYearMonth(end) : { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1 };
  if (!from || !to) return 0;
  return Math.max(0, (to.year - from.year) * 12 + (to.month - from.month));
};

/** 17 → "1 yr 5 mos", 36 → "3 yrs" */
export const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest || !years) parts.push(`${Math.max(rest, 1)} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
};
