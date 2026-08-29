"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { onboardingSchema, type OnboardingValues } from "@/schemas";
import {
  assistCACode,
  digitsOnly,
  digitsWithLeadingPlus,
  personName,
} from "@/lib";
import { Button, TextField, toast } from "./ui";

export function OnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        toast.success("Submitted");
        console.log({ data });
      })}
    >
      <h1 className="text-xl font-bold text-center mb-8">Onboarding Form</h1>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-x-2">
          <TextField
            label="First Name"
            placeholder="John"
            required
            formats={[personName]}
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <TextField
            label="Last Name"
            placeholder="Doe"
            required
            formats={[personName]}
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <TextField
          label="Phone Number"
          type="tel"
          placeholder="+14165550142"
          required
          formats={[digitsWithLeadingPlus, assistCACode]}
          maxLength={12}
          error={errors.phoneNum?.message}
          {...register("phoneNum")}
        />
        <TextField
          label="Corporation Number"
          placeholder="424242420"
          required
          inputMode="numeric"
          formats={[digitsOnly]}
          maxLength={9}
          error={errors.corpNum?.message}
          {...register("corpNum")}
        />

        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
