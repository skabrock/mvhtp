// Reject anything that is not a unicode letter, space, hyphen, or apostrophe.
const DISALLOWED = /[^\p{L} '\-]/gu;

export function sanitizePersonName(value: string): string {
  return value.replace(DISALLOWED, "");
}
