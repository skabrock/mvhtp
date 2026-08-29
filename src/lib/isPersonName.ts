// One or more letters, optionally joined by a space, hyphen, or apostrophe
// (José, Mary Jane, Anne-Marie, O'Connor).
const PATTERN = /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u;

export function isPersonName(value: string): boolean {
  return PATTERN.test(value);
}
