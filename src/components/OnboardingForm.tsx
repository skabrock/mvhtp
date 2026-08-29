"use client";

import { useForm } from "react-hook-form";
import { Button, TextField, toast } from "./ui";

export function OnboardingForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form
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
            {...register("firstName")}
          />
          <TextField
            label="Last Name"
            placeholder="Doe"
            required
            {...register("lastName")}
          />
        </div>

        <TextField
          label="Phone Number"
          type="tel"
          placeholder="+1 (416) 555-0142"
          required
          {...register("phoneNum")}
        />
        <TextField
          label="Corporation Number"
          placeholder="424242420"
          required
          {...register("corpNum")}
        />

        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
