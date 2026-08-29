import { z } from "zod";
import { isPersonName, normalizeCanadianPhone } from "@/lib";

const personName = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(50, `${label} must be 50 characters or less`)
    .refine(isPersonName, {
      message: "Only letters, spaces, hyphens, and apostrophes are allowed",
    });

export const onboardingSchema = z.object({
  firstName: personName("First name"),
  lastName: personName("Last name"),
  phoneNum: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .transform(normalizeCanadianPhone)
    .pipe(z.string().min(12, "Invalid phone number")),
  corpNum: z
    .string()
    .trim()
    .min(1, "Corporation number is required")
    .regex(/^\d{9}$/, "Corporation number must be 9 digits"),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;
