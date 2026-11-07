export type PageNumberType = number | "gap";

// Always 7 slots once there are more than 7 pages: the first and last page,
// the current page with its neighbours, and "gap" for the skipped runs
export const getPageNumbers = (
  current: number,
  total: number
): PageNumberType[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  if (current <= 4) return [...range(1, 5), "gap", total];
  if (current >= total - 3) return [1, "gap", ...range(total - 4, total)];

  return [1, "gap", current - 1, current, current + 1, "gap", total];
};
