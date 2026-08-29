"use client";

import { useMutation } from "@tanstack/react-query";
import { checkCorporationNumber } from "@/api";

export function useCheckCorpNum() {
  return useMutation({
    mutationFn: checkCorporationNumber,
    retry: false,
  });
}
