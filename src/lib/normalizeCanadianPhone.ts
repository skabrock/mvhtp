export function normalizeCanadianPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) return value.startsWith("+") ? "+" : "";

  if (digits.startsWith("1")) return `+${digits}`.slice(0, 12);

  return `+1${digits}`.slice(0, 12);
}
