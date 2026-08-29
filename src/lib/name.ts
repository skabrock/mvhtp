// Reject anything that is not a unicode letter, space, hyphen, or apostrophe.
const DISALLOWED = /[^\p{L} '\-]/gu;

// One or more letters, optionally joined by a space, hyphen, or apostrophe
// (José, Mary Jane, Anne-Marie, O'Connor).
const PATTERN = /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u;

export function sanitizePersonName(value: string): string {
  return value.replace(DISALLOWED, "");
}

export function isPersonName(value: string): boolean {
  return PATTERN.test(value);
}
