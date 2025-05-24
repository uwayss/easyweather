// FILE: src/api/airQuality.ts
import {
  AirQualityAPIResponse,
  CurrentAirQualityData,
} from "../types/airQuality";

const AIR_QUALITY_API_BASE_URL =
  "https://air-quality-api.open-meteo.com/v1/air-quality";

export async function fetchAirQuality(
  latitude: number,
  longitude: number
): Promise<CurrentAirQualityData | null> {
  // Starting with current US AQI and PM2.5. Can expand later.
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: "us_aqi,pm2_5,ozone", // Added ozone as it's often linked with AQI
    // hourly: "us_aqi,pm2_5,ozone", // Can add this later for charts
    domains: "auto", // Auto-selects global or regional model
    // timezone: "auto", // Not strictly needed for current, but good for hourly
  });

  try {
    const response = await fetch(`${AIR_QUALITY_API_BASE_URL}?${params}`);
    if (!response.ok) {
      console.error(
        `Failed to fetch air quality data: ${response.status} ${response.statusText}`
      );
      // Consider throwing a more specific error or returning a structured error object
      throw new Error("Failed to fetch air quality data");
    }
    const apiResponse: AirQualityAPIResponse = await response.json();

    if (apiResponse.current) {
      return {
        time: apiResponse.current.time,
        interval: apiResponse.current.interval,
        usAqi: apiResponse.current.us_aqi,
        pm2_5: apiResponse.current.pm2_5,
        ozone: apiResponse.current.ozone,
      };
    }
    return null;
  } catch (error) {
    console.error("Error in fetchAirQuality:", error);
    // Depending on error handling strategy, might re-throw or return null/error object
    throw error; // Re-throw for now, WeatherContext can catch it
  }
}
