"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitProfileDetails } from "@/api";

export function useSubmitOnboardingMutation() {
  return useMutation({
    mutationFn: submitProfileDetails,
    onSuccess: () => toast.success("Submitted"),
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Submission failed");
    },
  });
}
