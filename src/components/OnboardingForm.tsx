"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { CORP_NUM_LENGTH, PHONE_MAX_LENGTH } from "@/constants";
import { useCheckCorpNumQuery, useSubmitOnboardingMutation } from "@/hooks";
import { onboardingSchema, type OnboardingValues } from "@/schemas";
import type { ProfileDetails } from "@/api";
import {
  assistCACode,
  digitsOnly,
  digitsWithLeadingPlus,
  personName,
} from "@/lib";
import { CorpNumStatus } from "./CorpNumStatus";
import { Button, TextField, toast } from "./ui";

const emptyValues: OnboardingValues = {
  firstName: "",
  lastName: "",
  phoneNum: "",
  corpNum: "",
};

function normalizeSubmitData(data: OnboardingValues): ProfileDetails {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    corporationNumber: data.corpNum,
    phone: data.phoneNum,
  };
}

export function OnboardingForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: emptyValues,
  });

  const corpQuery = useCheckCorpNumQuery(watch("corpNum"));
  const submitProfile = useSubmitOnboardingMutation();
  const corpError =
    corpQuery.error instanceof Error ? corpQuery.error.message : undefined;

  function submit(data: OnboardingValues) {
    if (!corpQuery.isSuccess) {
      toast.error("Enter a valid corporation number");
      return;
    }

    submitProfile.mutate(normalizeSubmitData(data), {
      onSuccess: () => reset(emptyValues),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(submit)}>
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
          maxLength={PHONE_MAX_LENGTH}
          error={errors.phoneNum?.message}
          {...register("phoneNum")}
        />
        <TextField
          label="Corporation Number"
          placeholder="424242420"
          required
          inputMode="numeric"
          formats={[digitsOnly]}
          maxLength={CORP_NUM_LENGTH}
          error={errors.corpNum?.message ?? corpError}
          {...register("corpNum")}
          slots={{
            afterLabel: (
              <CorpNumStatus
                isFetching={corpQuery.isFetching}
                isSuccess={corpQuery.isSuccess}
                isError={corpQuery.isError}
              />
            ),
          }}
        />

        <Button
          type="submit"
          disabled={corpQuery.isFetching || submitProfile.isPending}
        >
          Submit
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
