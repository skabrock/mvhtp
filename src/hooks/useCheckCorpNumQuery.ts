"use client";

import { useQuery } from "@tanstack/react-query";
import { checkCorporationNumber } from "@/api";
import { CORP_NUM_LENGTH } from "@/constants";

export function useCheckCorpNumQuery(corporationNumber: string) {
  const enabled = corporationNumber.length === CORP_NUM_LENGTH;

  return useQuery({
    queryKey: ["corporation-number", corporationNumber],
    queryFn: () => checkCorporationNumber(corporationNumber),
    enabled,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
