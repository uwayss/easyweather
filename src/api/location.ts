// FILE: src/api/location.ts
import {
  LOCATION_SEARCH_API_URL,
  LOCATION_SEARCH_PARAMS,
  LOCATION_SEARCH_USER_AGENT,
} from "../constants/api";

export interface LocationResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country: string;
  };
}

export async function searchLocation(query: string): Promise<LocationResult[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `${LOCATION_SEARCH_API_URL}${LOCATION_SEARCH_PARAMS}&q=${encodedQuery}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": LOCATION_SEARCH_USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search for location");
  }

  return response.json();
}
