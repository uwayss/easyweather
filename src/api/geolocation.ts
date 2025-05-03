// FILE: src/api/geolocation.ts
import { GEOLOCATION_API_URL, GEOLOCATION_API_FIELDS, IP_FETCH_API_URL } from "../constants/api";
import { longToast } from "../utils/debug";

/**
 * Geolocation API module
 * Handles fetching location data from IP address
 */
export interface GeolocationResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

interface IPResponse {
  ip: string;
}

/**
 * Fetches the user's public IP address
 * @returns Promise resolving to the IP address string
 */
export async function fetchIPAddress(): Promise<string> {
  console.log("Fetching IP address from ipify API");
  const response = await fetch(IP_FETCH_API_URL);

  if (!response.ok) {
    console.error(`Failed to fetch IP address: ${response.status} ${response.statusText}`);
    longToast(`Failed to fetch IP address: ${response.status} ${response.statusText}`);
    throw new Error("Failed to fetch IP address");
  }

  const data = (await response.json()) as IPResponse;
  console.log(`Successfully retrieved IP address: ${data.ip}`);
  return data.ip;
}

/**
 * Fetches geolocation data based on an IP address
 * @param ipAddress The IP address to get location data for
 * @returns Promise resolving to geolocation data
 */
export async function fetchGeolocationFromIP(ipAddress: string): Promise<GeolocationResponse> {
  console.log(`Fetching geolocation data for IP: ${ipAddress}`);
  const url = `${GEOLOCATION_API_URL}${ipAddress}${GEOLOCATION_API_FIELDS}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Failed to fetch geolocation data: ${response.status} ${response.statusText}`);
    longToast(`Failed fetch geolocation from ip: ${response.status} ${response.statusText}`);
    throw new Error("Failed to fetch geolocation data");
  }

  const data = await response.json();
  console.log(`Geolocation data received: ${data.city}, ${data.regionName}, ${data.country}`);
  return data;
}

/**
 * Convenience function to fetch the current location in one call
 * @returns Promise resolving to geolocation data
 */
export async function fetchCurrentLocation(): Promise<GeolocationResponse> {
  console.log("Starting location fetch process");
  try {
    const ipAddress = await fetchIPAddress();
    const geoData = await fetchGeolocationFromIP(ipAddress);
    console.log("Location fetch completed successfully");
    return geoData;
  } catch (error) {
    console.error("Error fetching location:", error);
    longToast("Error fetching location: " + error);
    throw error instanceof Error ? error : new Error("Failed to get location from IP");
  }
}
