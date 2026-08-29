import { apiRequest } from "@/lib";
import { API_BASE } from "@/constants";

export interface CorporationNumberCheck {
  valid: true;
  corporationNumber: string;
}

export function checkCorporationNumber(corporationNumber: string) {
  return apiRequest<CorporationNumberCheck>(
    "GET",
    `${API_BASE}/corporation-number/${corporationNumber}`,
  );
}

export interface ProfileDetails {
  firstName: string;
  lastName: string;
  corporationNumber: string;
  phone: string;
}

export function submitProfileDetails(body: ProfileDetails) {
  return apiRequest("POST", `${API_BASE}/profile-details`, body);
}
