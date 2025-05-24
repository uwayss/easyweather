// FILE: src/types/airQuality.ts

// Represents the direct response from the Open-Meteo Air Quality API
export interface AirQualityAPIResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current_units?: {
    time?: string;
    interval?: string;
    us_aqi?: string;
    pm2_5?: string;
    ozone?: string;
    // Add other units as needed: european_aqi, pm10, carbon_monoxide, etc.
  };
  current?: {
    time: string;
    interval: number;
    us_aqi?: number;
    pm2_5?: number;
    ozone?: number;
    // Add other current values: european_aqi, pm10, carbon_monoxide, etc.
    // Add pollen types if fetched: alder_pollen, birch_pollen, etc.
  };
  hourly_units?: {
    time?: string;
    us_aqi?: string;
    pm2_5?: string;
    ozone?: string;
    // ... other hourly units
  };
  hourly?: {
    time: string[];
    us_aqi?: (number | null)[];
    pm2_5?: (number | null)[];
    ozone?: (number | null)[];
    // ... other hourly arrays
  };
  // Potentially daily data structure if we ever fetch daily AQI summaries
}

// Processed current air quality data for use in the app
export interface CurrentAirQualityData {
  time: string;
  interval: number;
  usAqi?: number;
  pm2_5?: number;
  ozone?: number;
  // europeanAqi?: number; // Example for future expansion
  // Add other processed fields as needed
}

// Example for future hourly data structure
export interface HourlyAirQualityEntry {
  time: string;
  usAqi?: number | null;
  pm2_5?: number | null;
  ozone?: number | null;
}

// Combined processed air quality data
export interface AirQualityData {
  current?: CurrentAirQualityData;
  hourly?: HourlyAirQualityEntry[];
}
