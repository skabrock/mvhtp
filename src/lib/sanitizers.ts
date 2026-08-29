import { sanitizePersonName } from "./name";
import { normalizeCanadianPhone } from "./phone";

export type InputSanitizer = (value: string, previousValue: string) => string;

/** Digits only. Used for corporation number. */
export const digitsOnly: InputSanitizer = (value) => value.replace(/\D/g, "");

/** Digits, plus a leading + if the user typed it. Used for phone number. */
export const digitsWithLeadingPlus: InputSanitizer = (value) => {
  const leadingPlus = value.startsWith("+");
  return (leadingPlus ? "+" : "") + value.replace(/\D/g, "");
};

/**
 * If the field was empty and the user skipped + or +1, insert the prefix.
 * Does not run when they start with +, so they can type +1 themselves.
 */
export const assistCACode: InputSanitizer = (value, previousValue) => {
  if (previousValue !== "" || value === "" || value.startsWith("+")) {
    return value;
  }
  return normalizeCanadianPhone(value);
};

/** Letters, spaces, hyphens, and apostrophes only. Used for first/last name. */
export const personName: InputSanitizer = (value) => sanitizePersonName(value);
