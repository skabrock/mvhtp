"use client";

import { useQuery } from "@tanstack/react-query";
import { checkCorporationNumber } from "@/api";
import { CORP_NUM_LENGTH } from "@/constants";

export function useCheckCorpNumQuery(corporationNumber: string) {
  return useQuery({
    queryKey: ["corporation-number", corporationNumber],
    queryFn: () => checkCorporationNumber(corporationNumber),
    enabled: corporationNumber.length === CORP_NUM_LENGTH,
    retry: false,
  });
}
