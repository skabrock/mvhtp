import { PHONE_MAX_LENGTH } from "@/constants";

export function normalizeCanadianPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) return value.startsWith("+") ? "+" : "";

  if (digits.startsWith("1")) return `+${digits}`.slice(0, PHONE_MAX_LENGTH);

  return `+1${digits}`.slice(0, PHONE_MAX_LENGTH);
}
