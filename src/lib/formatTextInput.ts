import { sanitizePersonName } from "./sanitizePersonName";

export type TextInputFormat = (value: string) => string;

/** Digits only. Used for corporation number. */
export const digitsOnly: TextInputFormat = (value) => value.replace(/\D/g, "");

/** Letters, spaces, hyphens, and apostrophes only. Used for first/last name. */
export const personName: TextInputFormat = (value) => sanitizePersonName(value);
