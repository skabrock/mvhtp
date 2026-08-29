"use client";

import { useForm } from "react-hook-form";
import { Button, TextField, toast } from "./ui";

export default function OnboardingForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        toast.success("Submitted");
        console.log({ data });
      })}
      className="flex flex-col gap-5"
    >
      <h1 className="text-xl font-semibold tracking-tight">Onboarding</h1>

      <div className="grid grid-cols-2 gap-x-2">
        <TextField label="First Name" {...register("firstName")} />
        <TextField label="Last Name" {...register("lastName")} />
      </div>

      <TextField label="Phone Number" type="tel" {...register("phoneNum")} />
      <TextField label="Corporation Number" {...register("corpNum")} />

      <Button type="submit">Submit</Button>
    </form>
  );
}
