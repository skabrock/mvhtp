export { normalizeCanadianPhone } from "./phone";
export { sanitizePersonName, isPersonName } from "./name";
export {
  type InputSanitizer,
  digitsOnly,
  digitsWithLeadingPlus,
  assistCACode,
  personName,
} from "./sanitizers";
