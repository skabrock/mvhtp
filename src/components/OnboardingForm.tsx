"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { CORP_NUM_LENGTH, PHONE_MAX_LENGTH } from "@/constants";
import { useCheckCorpNumQuery, useSubmitOnboardingMutation } from "@/hooks";
import { onboardingSchema, type OnboardingValues } from "@/schemas";
import { digitsOnly, normalizeCanadianPhone, personName } from "@/lib";
import { CorpNumStatus } from "./CorpNumStatus";
import { Button, TextField } from "./ui";

export function OnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { firstName: "", lastName: "", phoneNum: "", corpNum: "" },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const corpNum = useWatch({ control, name: "corpNum" });
  const corpQuery = useCheckCorpNumQuery(corpNum);
  const onboardingSubmit = useSubmitOnboardingMutation();

  function formSubmit(data: OnboardingValues) {
    if (!corpQuery.isSuccess) return;

    // Reset form focus state
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    onboardingSubmit.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        corporationNumber: data.corpNum,
        phone: data.phoneNum,
      },
      {
        onSuccess: () => reset(),
      },
    );
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
          formats={[normalizeCanadianPhone]}
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
          error={errors.corpNum?.message ?? corpQuery.error?.message}
          slots={{
            afterLabel: (
              <CorpNumStatus
                isFetching={corpQuery.isFetching}
                isSuccess={corpQuery.isSuccess}
                isError={corpQuery.isError}
              />
            ),
          }}
          {...register("corpNum")}
        />

        <Button
          type="submit"
          disabled={corpQuery.isFetching || onboardingSubmit.isPending}
        >
          Submit
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
