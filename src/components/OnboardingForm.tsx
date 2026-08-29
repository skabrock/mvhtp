"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { CORP_NUM_LENGTH, PHONE_MAX_LENGTH } from "@/constants";
import { useCheckCorpNum, useSubmitOnboardingMutation } from "@/hooks";
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
    reset,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: emptyValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const checkCorp = useCheckCorpNum();
  const onboardingSubmit = useSubmitOnboardingMutation();

  function formSubmit(data: OnboardingValues) {
    if (!checkCorp.isSuccess) {
      toast.error("Enter a valid corporation number");
      return;
    }

    onboardingSubmit.mutate(normalizeSubmitData(data), {
      onSuccess: () => {
        reset(emptyValues);
        checkCorp.reset();
      },
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(formSubmit)}>
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
          error={errors.corpNum?.message ?? checkCorp.error?.message}
          slots={{
            afterLabel: (
              <CorpNumStatus
                isFetching={checkCorp.isPending}
                isSuccess={checkCorp.isSuccess}
                isError={checkCorp.isError}
              />
            ),
          }}
          {...register("corpNum", {
            onChange: checkCorp.reset,
            onBlur: (event) => {
              const corpNum = event.target.value;
              if (corpNum.length === CORP_NUM_LENGTH) {
                checkCorp.mutate(corpNum);
              }
            },
          })}
        />

        <Button
          type="submit"
          disabled={checkCorp.isPending || onboardingSubmit.isPending}
        >
          Submit
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
